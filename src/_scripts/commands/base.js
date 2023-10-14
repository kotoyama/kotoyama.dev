export class BaseCommand {
  constructor(command) {
    this._command = command
    this._result = ''
  }

  get command() {
    return this._command
  }

  set command(value) {
    this._command = value
  }

  execute() {
    return this._result
  }
}
