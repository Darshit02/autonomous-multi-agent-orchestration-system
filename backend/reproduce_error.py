from app.core.security import hash_password, verify_password

try:
    password = "testpassword"
    hashed = hash_password(password)
    print(f"Hashed: {hashed}")
    verified = verify_password(password, hashed)
    print(f"Verified: {verified}")
    
    # Test with a 73+ character password to ensure it works
    long_password = "a" * 73
    hashed_long = hash_password(long_password)
    print(f"Long Hashed: {hashed_long}")
    verified_long = verify_password(long_password, hashed_long)
    print(f"Long Verified: {verified_long}")

except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()
