export class BaseCommand {
  constructor(command) {
    this._command = command
    this._result = ''
  }

  execute() {
    return this._result
  }
}
