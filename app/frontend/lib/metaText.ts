import { QueryVariables } from "~/lib/types";
import { getConditionText } from "./utils";

type Constructor = {
  subject: string;
  prefecture?: { name: string };
  conditions: QueryVariables;
};

export default class MetaText {
  private _subject: string;
  private _prefecture?: { name: string };
  private _conditions: QueryVariables;

  constructor({ subject, prefecture, conditions }: Constructor) {
    this._subject = subject;
    this._prefecture = prefecture;
    this._conditions = conditions;
  }

  /**
   * @returns `${this._subject}${conditionText}の中古マンションを探す｜中古マンション購入・売却ならHousii`;
   */
  public getBasicTitle(): string {
    let conditionText = getConditionText({
      conditions: this._conditions,
      conditionFilter: ["gfb", "gft", "utb"],
    });
    if (conditionText !== "") conditionText = `(${conditionText})`;
    return `${this._subject}${conditionText}の中古マンションを探す｜中古マンション購入・売却ならHousii`;
  }

  /**
   * @returns `【${this._subject}${prefectureString}${conditionText}】の中古マンション一覧です。Housii（ハウシー）では【${this._subject}】のプレミアム中古マンションの売却・相場情報、価格推移、周辺環境とマンション情報が満載。都心・アクセスが良い・きれい・人気の高いプレミアム購入中古マンションを探すならHousii（ハウシー）におまかせ。`;
   */
  public getBasicDescription(): string {
    const prefectureString = this._prefecture
      ? `(${this._prefecture.name})`
      : "";
    let conditionText = getConditionText({ conditions: this._conditions });
    if (conditionText !== "") conditionText = `(${conditionText})`;
    return `【${this._subject}${prefectureString}${conditionText}】の中古マンション一覧です。Housii（ハウシー）では【${this._subject}】のプレミアム中古マンションの売却・相場情報、価格推移、周辺環境とマンション情報が満載。都心・アクセスが良い・きれい・人気の高いプレミアム購入中古マンションを探すならHousii（ハウシー）におまかせ。`;
  }
}
