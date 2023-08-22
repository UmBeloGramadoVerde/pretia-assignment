import { ROLE } from './../../auth/constants/role.constant';
import { Action } from './action.constant';
import { Actor } from './actor.constant';

export type RuleCallback<Resource> = (
  resource: Resource,
  actor: Actor,
) => boolean;

export type AclRule<Resource> = {
  role: ROLE;

  actions: Action[];

  ruleCallback?: RuleCallback<Resource>;
};
