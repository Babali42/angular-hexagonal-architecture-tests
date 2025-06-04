import {TypeScriptProject} from "arch-unit-ts/dist/arch-unit/core/domain/TypeScriptProject";
import {RelativePath} from "arch-unit-ts/dist/arch-unit/core/domain/RelativePath";
import {classes, noClasses} from "arch-unit-ts/dist/main";
import {BusinessContext} from '../app/package-contexts';

describe('Hexagonal architecture test', () => {
  const srcProject = new TypeScriptProject(RelativePath.of("src"));

  describe("domain", () => {
    it("should not depends on outside", ()=> {
      classes()
        .that()
        .resideInAPackage('..domain..')
        .should()
        .onlyDependOnClassesThat()
        .resideInAPackage('..domain..')
        .because('domain model should only depends on domain')
        .check(srcProject.allClasses())
    });
  });

  const businessContext = packageWithContext(BusinessContext.SUBSCRIPTION)
    .concat(packageWithContext(BusinessContext.BILLING));

  function otherBusinessContextsDomain(context: string): string[] {
    return [BusinessContext.SUBSCRIPTION, BusinessContext.BILLING].filter(other => other != context).map(name => name + '.domain');
  }

  function packageWithContext(contextName: string): string[] {
    return srcProject
      .filterClasses('**.package-info.ts')
      .filter(typescriptClass => typescriptClass.hasImport(contextName))
      .map(typescriptClass => typescriptClass.packagePath.getDotsPath());
  }

  describe("Business contexts", () => {
    it.each([BusinessContext.SUBSCRIPTION, BusinessContext.BILLING])("Context '%s' should not depend on other bounded contexts", (context) => {
      noClasses()
        .that()
        .resideInAPackage(context + '..')
        .should()
        .dependOnClassesThat()
        .resideInAPackage(...otherBusinessContextsDomain(context))
        .because("Bounded contexts should be isolated")
        .check(srcProject.allClasses());
    });
  });
});
