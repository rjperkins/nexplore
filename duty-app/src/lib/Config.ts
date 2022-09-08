export default class Config {
  static get baseUrl(): string {
    return process.env.BASE_URL || 'http://localhost:8000';
  }
}
