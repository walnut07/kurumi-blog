---
title: 'ReactアプリをGCPでCI/CDした記録'
metaDesc: 
socialImage: 'images/gcp_architecture.jpg'
date: '2023-2-4'
tags:
  - GCP
lang: 'ja'
---

## Summary
**GCP（Goggle Cloud Platform）を勉強する目的で、フロントエンドオンリーの簡単なWebアプリケーションをつくりデプロイしました！** Githubレポジトリのmainブランチが更新される度にデプロイが実行され、**いわゆるCI/CDの状態**となっています。\
Webアプリケーションはポケモンに関するもので、私のように最近ポケモンViolet/Scarletを始めた方にぴったりのアプリです！2022年2月4日現在、アプリは[こちら](https://ui-5yazb6qiaq-uc.a.run.app/)で動いています。（本記事ではアプリケーション
内容については述べません。GCPオンリー。）\
GCP、ましてやCloud Computing Serviceを使用するのは初めてだったため、様々な学びがありました！調べながら自分の理解を深めようと思い、この記事を書いています。

## Architecture
コードがデプロイされるまでの過程は、このようになっています。
![全体像](https://drive.google.com/uc?id=1AQwEG9xp3OFaqdrnZQnYTks9WGXtPa97)

## それぞれのサービス
ここからはそれぞれのサービスの役割を記述します。

### Cloud Build
公式ドキュメントによると、Cloud Buildは「**さまざまなリポジトリやクラウド ストレージ スペースからソースコードをインポートし、仕様に合わせてビルドを実行し、Docker コンテナや Java アーカイブなどのアーティファクトを生成**」するサービスです。本アプリケーションの場合、Githubリポジトリ内にあるDockerfileを基にビルドが実行されます。

今回はCI/CDを可能にするため、Cloud Buildのトリガーを設定しました。Githubリポジトリのmainブランチが更新される度に、Cloud Buildが行われ、Cloud Runにデプロイされます。画像はトリガーが設定されたことが確認できる画面です。
![Cloud Buildの設定画面](https://drive.google.com/uc?id=1wiwyQC5MKbVhLG8EfjiuXNPNpi84l-jX)

公式ドキュメントでは、以下のページがCloud Build Triggerの使用方法を解説しています。\
[Continuous deployment from Git using Cloud Build](https://cloud.google.com/run/docs/continuous-deployment-with-cloud-build)

今回は使用しなかったのですが、[Artifact Registry](https://cloud.google.com/artifact-registry)にDockerイメージをプッシュすることもできるそうです。Artifact Registryは、ビルドのアーティファクト（つまりビルド後のデータ）を保存することができる場所です。Cloud Build Triggerを使用しCloud Runにデプロイする場合とArtifact RegistryからCloud Runにデプロイする場合の違いは、今回は調べられませんでした。もう少しGCPの全体像を把握したら調べてみたいです。

### Cloud Run
公式ドキュメント「[Cloud Run とは](https://cloud.google.com/run/docs/overview/what-is-cloud-run?hl=ja)」によると、「**Cloud Run は、Google のスケーラブルなインフラストラクチャ上でコンテナを直接実行できるマネージド コンピューティング プラットフォーム**」です。さらにドキュメントを読むと、Webサイト・Webアプリケーション、API・マイクロサービスがCloud Runへデプロイできると分かります。ここで気になったのが、データベースについて。公式ドキュメントにはCloud SQL等と統合することで動的なHTMLページをレンダリングできると書いてあったのですが、いくつかの個人ブログがRelational DatabaseやStorage Serviceを動かすのには適していないと書いていました。（例：[Google Cloud Run を使うまで](https://qiita.com/massie_g/items/5a9ce514eaa7c460b5e3)）なぜ適していないのかは今回調べられなかったため、実際にプロジェクトでCloud Runを使う際には、調べる必要がありそうです。

## 今後調べたいこと
 - Cloud Build Triggerを使用しCloud Runにデプロイ vs Artifact RegistryからCloud Runにデプロイ の違い
 - Cloud Runは本当にRelational Databaseに適していない？適していないなら、GCPのエコシステムをどうやって活用したら適するの？
 - Cloud RunにREST APIをデプロイする方法

## 感想
初めてCloud Computing Serviceを使用できたことが嬉しい！デプロイには何日もかかるだろうな・・・と思っていましたが、デプロイをするだけなら2〜３時間ほどで終わりました！個人のブログを参考にしつつ、分からない点は公式ドキュメントを参照する形で進めました。分からないことはたくさんあるのですが、それらの疑問を抽象化すると、巨大なGCPエコシステムの中にたくさんのサービスがあり、どのような場合に何を使えばいいのかあまり分かっていない！と言えそうです。このエコシステムを上手く利用できるようになるには、どのような勉強が必要なんだろう？だれかアドバイスがあったら教えてください！
