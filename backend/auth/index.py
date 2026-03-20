"""
Авторизация семейного мессенджера: регистрация, вход, выход, проверка сессии.
action в body: register | login | me | logout
v2
"""
import json
import os
import hashlib
import secrets
import psycopg2

CORS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, X-Session-Token',
}

def get_conn():
    return psycopg2.connect(os.environ['DATABASE_URL'])

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def ok(data: dict) -> dict:
    return {'statusCode': 200, 'headers': CORS, 'body': json.dumps(data)}

def err(code: int, msg: str) -> dict:
    return {'statusCode': code, 'headers': CORS, 'body': json.dumps({'error': msg})}

def handler(event: dict, context) -> dict:
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': CORS, 'body': ''}

    schema = os.environ.get('MAIN_DB_SCHEMA', 't_p20272644_family_messenger')
    body = json.loads(event.get('body') or '{}')
    action = body.get('action', '')
    token = (event.get('headers') or {}).get('X-Session-Token', '')

    # me — проверка сессии (GET без action)
    if not action or action == 'me':
        if not token:
            return err(401, 'Не авторизован')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"""
            SELECT u.id, u.name, u.phone, u.avatar, u.status_text
            FROM {schema}.sessions s
            JOIN {schema}.users u ON u.id = s.user_id
            WHERE s.token = '{token}' AND s.expires_at > NOW()
        """)
        row = cur.fetchone()
        conn.close()
        if not row:
            return err(401, 'Сессия истекла')
        uid, name, phone, avatar, status_text = row
        return ok({'user': {'id': uid, 'name': name, 'phone': phone, 'avatar': avatar, 'status_text': status_text or ''}})

    # register — регистрация
    if action == 'register':
        name = body.get('name', '').strip()
        phone = body.get('phone', '').strip()
        password = body.get('password', '')
        avatar = body.get('avatar', '👤')
        if not name or not phone or not password:
            return err(400, 'Заполните все поля')
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id FROM {schema}.users WHERE phone = '{phone}'")
        if cur.fetchone():
            conn.close()
            return err(409, 'Такой номер уже зарегистрирован')
        pw_hash = hash_password(password)
        cur.execute(f"INSERT INTO {schema}.users (name, phone, password_hash, avatar) VALUES ('{name}', '{phone}', '{pw_hash}', '{avatar}') RETURNING id")
        user_id = cur.fetchone()[0]
        new_token = secrets.token_hex(32)
        cur.execute(f"INSERT INTO {schema}.sessions (user_id, token) VALUES ({user_id}, '{new_token}')")
        conn.commit()
        conn.close()
        return ok({'token': new_token, 'user': {'id': user_id, 'name': name, 'phone': phone, 'avatar': avatar, 'status_text': ''}})

    # login — вход
    if action == 'login':
        phone = body.get('phone', '').strip()
        password = body.get('password', '')
        if not phone or not password:
            return err(400, 'Введите номер и пароль')
        pw_hash = hash_password(password)
        conn = get_conn()
        cur = conn.cursor()
        cur.execute(f"SELECT id, name, phone, avatar, status_text FROM {schema}.users WHERE phone = '{phone}' AND password_hash = '{pw_hash}'")
        row = cur.fetchone()
        if not row:
            conn.close()
            return err(401, 'Неверный номер или пароль')
        uid, name, user_phone, avatar, status_text = row
        new_token = secrets.token_hex(32)
        cur.execute(f"INSERT INTO {schema}.sessions (user_id, token) VALUES ({uid}, '{new_token}')")
        conn.commit()
        conn.close()
        return ok({'token': new_token, 'user': {'id': uid, 'name': name, 'phone': user_phone, 'avatar': avatar, 'status_text': status_text or ''}})

    # logout — выход
    if action == 'logout':
        if token:
            conn = get_conn()
            cur = conn.cursor()
            cur.execute(f"UPDATE {schema}.sessions SET expires_at = NOW() WHERE token = '{token}'")
            conn.commit()
            conn.close()
        return ok({'ok': True})

    return err(400, 'Неизвестное действие')