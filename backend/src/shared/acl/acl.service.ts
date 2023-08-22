import { ROLE } from './../../auth/constants/role.constant';
import { AclRule, RuleCallback } from './acl-rule.constant';
import { Action } from './action.constant';
import { Actor } from './actor.constant';

export class BaseAclService<Resource> {
  protected aclRules: AclRule<Resource>[] = [];

  protected canDo(
    role: ROLE,
    actions: Action[],
    ruleCallback?: RuleCallback<Resource>,
  ): void {
    ruleCallback
      ? this.aclRules.push({ role, actions, ruleCallback })
      : this.aclRules.push({ role, actions });
  }

  public forActor = (actor: Actor): any => {
    return {
      canDoAction: (action: Action, resource?: Resource) => {
        let canDoAction = false;

        actor.roles.forEach((actorRole) => {
          if (canDoAction) return true;

          const aclRules = this.aclRules.filter(
            (rule) => rule.role === actorRole,
          );

          aclRules.forEach((aclRule) => {
            if (canDoAction) return true;

            const hasActionPermission =
              aclRule.actions.includes(action) ||
              aclRule.actions.includes(Action.Manage);

            canDoAction =
              hasActionPermission &&
              (!aclRule.ruleCallback || aclRule.ruleCallback(resource, actor));
          });
        });

        return canDoAction;
      },
    };
  };
}
