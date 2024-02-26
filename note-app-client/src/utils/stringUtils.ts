interface String {
  isBlank(): boolean;
}

String.prototype.isBlank = function (): boolean {
  return this.trim().length === 0;
};
