# dx-inno（ms-libraryのDB現状）

## ！！注意！！
 - 本番環境更新時には、ステージング環境のDBスキーマの構成や中身と本番環境のDBスキーマの構成や中身は一致させること

## DBデプロイ方法について
2021年9月現在、DBデプロイはDB切り替えを行うことで行っている。
使用中のDBと未使用のDB（inno_renewal_a, inno_renewal_b）を切り替えDBデプロイを行う。

## 現在のDB状態

### ステージング環境
- inno_renewal_a：デプロイ時の切り替え用DB
- inno_renewal_b：デプロイ時の切り替え用DB
- inno_production：現在未使用.2021年8月上旬まで使用していたDB（inno_renewalと交代）

### 本番環境
- inno_renewal_a：デプロイ時の切り替え用DB
- inno_renewal_b：デプロイ時の切り替え用DB
- inno_production：現在未使用.2021年8月上旬まで使用していたDB（inno_renewalと交代）

## DBのデプロイ手順

### ステージング環境へのDBデプロイ手順
1. 【デプロイ準備】<b>speee-dx-inno-stagingアカウント</b>で[SSMのパラメータストアにてDATABASE_NAME](https://ap-northeast-1.console.aws.amazon.com/systems-manager/parameters/inno/rails/DATABASE_NAME/description?region=ap-northeast-1)の値を確認して、現在使用中のDBを把握（このDBを稼働中DBと呼ぶ）
2. 【デプロイ準備】inno_renewal_a, inno_renewal_bのうち、現在使用していないDBを把握（このDBを待機中DBと呼ぶ）
3. 【デプロイ準備】待機中DBにローカルでDumpしたDBデータをインポート
4. 【デプロイ準備】<b>speee-dx-inno-stagingアカウント</b>で[SSMのパラメータストアにてDATABASE_NAME](https://ap-northeast-1.console.aws.amazon.com/systems-manager/parameters/inno/rails/DATABASE_NAME/description?region=ap-northeast-1)の値を待機中DB名に変更
5. 【デプロイ実行】ステージング環境をrestart（再デプロイ）することで環境変数が変わり、DBのswitchが完了（待機中DBが稼働中DBに、稼働中DBが待機中DBに移り変わる）
6. 【デプロイ実行後】ステージング環境を周回し、異常がないか確認

### 本番環境へのDBデプロイ手順
1. 【デプロイ準備】<b>speee-dx-inno-productionアカウント</b>で[SSMのパラメータストアにてDATABASE_NAME](https://ap-northeast-1.console.aws.amazon.com/systems-manager/parameters/inno/rails/DATABASE_NAME/description?region=ap-northeast-1)の値を確認して、現在使用中のDBを把握（このDBを稼働中DBと呼ぶ）
2. 【デプロイ準備】inno_renewal_a, inno_renewal_bのうち、現在使用していないDBを把握（このDBを待機中DBと呼ぶ）
3. 【デプロイ準備】待機中DBにローカルでDumpしたDBデータをインポート
4. 【デプロイ準備】<b>speee-dx-inno-productionアカウント</b>で[SSMのパラメータストアにてDATABASE_NAME](https://ap-northeast-1.console.aws.amazon.com/systems-manager/parameters/inno/rails/DATABASE_NAME/description?region=ap-northeast-1)の値を待機中DB名に変更
5. 【デプロイ実行】本番環境をrestart（再デプロイ）することで環境変数が変わり、DBのswitchが完了（待機中DBが稼働中DBに、稼働中DBが待機中DBに移り変わる）
6. 【デプロイ実行後】ステージング環境を周回し、異常がないか確認

## 【重要】Dumpを行う際の注意点
 - RDSからエクスポートしたDumpファイルには、2021年9月現在下記コードが含まれていて、RDSにインポートする際エラーが出てしまうため要注意
参考：https://yoneyore.hatenablog.com/entry/2020/07/15/205611
```
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;
SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';
```