import jwt_decode, { JwtPayload } from 'jwt-decode';

export function checkExpireToken(token: string | null) {
  if (!token) return;
  const decoded = jwt_decode(token) as JwtPayload;
  const expirationDate = new Date(decoded.exp! * 1000);
  const currentUnixTime = Math.floor(Date.now() / 1000);

  if (currentUnixTime > decoded.exp!) {
    console.log(`'Срок действия токена истек:' ${expirationDate}`);
    return currentUnixTime > decoded.exp!;
  }
  console.log(`Токен дейсвует до: ${expirationDate}`);
  return false;
}
