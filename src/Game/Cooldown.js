const DEFAULT_COOLDOWN_PERIOD = 1000; // 1 seconde

class Cooldown {
  constructor(cooldownPeriod = DEFAULT_COOLDOWN_PERIOD) {
    this.cooldownPeriod = cooldownPeriod;
    this.started = false;
    this.startTime = null;
  }

  startCooldown() {
    if (!this.started) {
      this.started = true;
      this.startTime = Date.now();
    }
  }

  isCooledDown() {
    return this.started && Date.now() >= (this.startTime + this.cooldownPeriod);
  }
}

const allCooldowns = [];

export function registerCooldown(cooldownPeriod) {
  const c = new Cooldown(cooldownPeriod);
  allCooldowns.push(c);
  return c;
}

export function cleanExpiredCooldowns() {
  allCooldowns.filter(c => !c.isCooledDown());
}
