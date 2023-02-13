import prompts from "@maidang606/shared/compiled/prompts";
import { Generator } from "./generator";
export declare class BaseGenerator extends Generator {
    path: string;
    target: string;
    data: any;
    questions: prompts.PromptObject[];
    constructor({ path, target, data, questions, baseDir }: any);
    prompting(): prompts.PromptObject<string>[];
    writing(): Promise<void>;
}
//# sourceMappingURL=baseGenerator.d.ts.map