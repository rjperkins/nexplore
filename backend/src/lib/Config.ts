export default class Config {
  static get port(): number {
    return Number(process.env.PORT) || 3000;
  }
  static get host(): string {
    return process.env.HOST || 'localhost';
  }
  static get user(): string {
    return process.env.DB_USER || 'richard';
  }
  static get database(): string {
    return process.env.DATABASE || 'nexplore';
  }
  static get dbPassword(): string {
    return process.env.DB_PASSWORD || '';
  }
  static get dbPort(): number {
    return Number(process.env.DB_PORT) || 5432;
  }
}
