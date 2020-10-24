import * as v from '@thi.ng/vectors';

import { move, getBounds, isColliding, everything } from '../World/World';
import { isItemPickable } from '../World/Items/Interactions';
import Animation from './Animation';
import { registerCooldown } from '../Cooldown';

import playerAnimationUrl from '../../../assets/viking_rest_sprite.png';
import playerAnimationRightUrl from '../../../assets/viking_rest_sprite_right.png';

const ACTION_COOLDOWN = 300; // 0.3 secondes
const JUMP_COOLDOWN = 100; // 0.3 secondes

class Player {

  constructor(pos = [0, 0], speed = [0, 0]) {
    this.pos = pos;
    this.speed = speed;
    this.prevSpeed = null;
    this.animation = new Animation(playerAnimationUrl, {
      numberOfFrames: 8,
      frameRate: 5,
    });
    this.animationRight = new Animation(playerAnimationRightUrl, {
      numberOfFrames: 8,
      frameRate: 5,
    });
    this.actionCooldown = registerCooldown(0); // helps with the code
    this.jumpCooldown = registerCooldown(0);
  }

  size = { width: 75, height: 120 };
  hitboxSize = { width: 45, height: 77 };

  canJump = true;

  inTheAir = false;

  direction = 1;

  maxSpeed = 7;
  maxVerticalSpeed = 20;

  carriedItem = null;

  getBounds() {
    return getBounds(this.pos, this.hitboxSize);
  }

  logic(env) {
    const {
      controls: { left, right, up, down, action },
      time,
    } = env;
    const speedModified = this.inTheAir ? 0.05 : 0.1;

    if (left) {
      this.speed = v.add2([], this.speed, [-speedModified * time.deltaT, 0]);
      this.speed[0] = Math.max(-this.maxSpeed, this.speed[0]);
      this.direction = -1;
    }
    if (right) {
      this.speed = v.add2([], this.speed, [speedModified  * time.deltaT, 0]);
      this.speed[0] = Math.min(this.maxSpeed, this.speed[0]);
      this.direction = 1;
    }
    if (up && this.canJump && this.jumpCooldown.isCooledDown()) {
      this.speed = [this.speed[0], Math.abs(this.speed[0])/1.5 + 15];
      this.canJump = false;
      this.jumpCooldown = registerCooldown(JUMP_COOLDOWN);
    }
    if (!up) {
      this.jumpCooldown.startCooldown();
    }
    if (!left && ! right) {
      const desc = 0.05 * time.deltaT;
      if (Math.abs(this.speed[0]) < desc) {
        this.speed[0] = 0;
      } else {
        this.speed = v.add2([], this.speed, [-this.direction * desc, 0]);
      }
    }


    // Manage player action
    if (action) {
      // If action is pressed
      if (this.actionCooldown.isCooledDown()) {
        // If the cool down period to do a new action has elapsed
        if (!this.carriedItem) {
          // If not already carrying something, check if there is something to pick up
          everything.forEach((el) => {
            if (isItemPickable(el)) {
              if (isColliding(getBounds(el.pos, el.size), this.getBounds()) && !this.carriedItem) {
                this.carriedItem = el;
                this.actionCooldown = registerCooldown(ACTION_COOLDOWN);
              }
            }
          });
        } else {
          // If carrying an item, drop it or throw it
          this.carriedItem.speed = down ? [0, 0] : [this.direction * 15, 15];
          this.carriedItem = null;
          this.actionCooldown = registerCooldown(ACTION_COOLDOWN);
        }
      }
    } else {
      // Start the action cooldown
      this.actionCooldown.startCooldown();
    }



    if (this.speed[0] < 0) {
      this.speed[0] = Math.max(this.speed[0], -this.maxSpeed);
    } else {
      this.speed[0] = Math.min(this.speed[0], this.maxSpeed);
    }
    if (this.speed[1] < 0) {
      this.speed[1] = Math.max(this.speed[1], -this.maxVerticalSpeed);
    } else {
      this.speed[1] = Math.min(this.speed[1], this.maxVerticalSpeed);
    }

    const newPos = move(this.pos, this.speed, this.hitboxSize, env);
    if (this.pos[0] === newPos[0]) {
      this.speed[0] = 0;
    }
    if (this.pos[1] === newPos[1]) {
      this.speed[1] = 0;
    }
    this.pos = newPos;

    if (this.prevSpeed && this.prevSpeed[1] === this.speed[1] && this.speed[1] === 0) {
      this.canJump = true;
      this.inTheAir = false;
    } else if (this.prevSpeed){
      this.inTheAir = true;
    }
    this.prevSpeed = this.speed;

    // Force the carried item position
    if (this.carriedItem) {
      this.carriedItem.pos = [this.pos[0] + (this.direction * this.size.width / 4), this.pos[1] + (this.size.height / 4)];
      this.carriedItem.speed = [0, 0];
    }
  }

  draw(env) {
    const { camera: { ctx } } = env;
    const { pos, size } = this;
    const xPos = pos[0] - (size.width / 2);
    const yPos = ctx.canvas.height - pos[1] - size.height;
    // const bounds = this.getBounds();
    // ctx.beginPath();
    // ctx.strokeStyle = "green";
    // ctx.moveTo(bounds[0][0], ctx.canvas.height - bounds[0][1]);
    // ctx.lineTo(bounds[1][0], ctx.canvas.height - bounds[1][1]);
    // ctx.lineTo(bounds[2][0], ctx.canvas.height - bounds[2][1]);
    // ctx.lineTo(bounds[3][0], ctx.canvas.height - bounds[3][1]);
    // ctx.closePath();
    // ctx.stroke();

    if (this.direction >= 1) {
      this.animationRight.draw(ctx, xPos, yPos, this.size);
    } else {
      this.animation.draw(ctx, xPos, yPos, this.size);
    }
  }
}

export default Player;
