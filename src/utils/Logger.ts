export default class Logger {
  public static LogToConsole = true;

  public static Log(message: string) {
    if (!this.LogToConsole) return;

    console.log(message);
  }
}
