# 開発環境セットアップガイド

このドキュメントでは、asdf または nvm を使用した開発環境のセットアップと使用方法について説明します。

## 目次

1. [概要](#概要)
2. [asdfを使用したセットアップ](#asdfを使用したセットアップ)
3. [nvmを使用したセットアップ](#nvmを使用したセットアップ)
4. [プロジェクトのセットアップ](#プロジェクトのセットアップ)
5. [開発サーバーの起動](#開発サーバーの起動)
6. [トラブルシューティング](#トラブルシューティング)

## 概要

このプロジェクトは React と TypeScript を使用しており、Bun をパッケージマネージャーおよび開発サーバーとして使用しています。開発環境をセットアップするには、以下のいずれかの方法を選択してください。

## asdfを使用したセットアップ

[asdf](https://asdf-vm.com/) は複数の言語やツールのバージョン管理を一元化できるツールです。

### 1. asdfのインストール

macOSの場合（Homebrew使用）:

```bash
brew install asdf
```

他のOSの場合は[公式ドキュメント](https://asdf-vm.com/guide/getting-started.html)を参照してください。

### 2. asdf設定をシェルに追加

Bashの場合:

```bash
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.bashrc
source ~/.bashrc
```

Zshの場合:

```bash
echo -e "\n. $(brew --prefix asdf)/libexec/asdf.sh" >> ~/.zshrc
source ~/.zshrc
```

### 3. Bunプラグインのインストール

```bash
asdf plugin add bun
```

### 4. Bunのインストール

```bash
asdf install bun latest
asdf global bun latest
```

バージョンを確認:

```bash
bun --version
```

## nvmを使用したセットアップ

[nvm](https://github.com/nvm-sh/nvm) は Node.js のバージョン管理ツールです。Bunをインストールするために、まずNode.jsをインストールします。

### 1. nvmのインストール

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
```

インストール後、ターミナルを再起動するか、以下のコマンドを実行:

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
```

### 2. Node.jsのインストール

```bash
nvm install node  # 最新版
# または特定のバージョン
# nvm install 18.18.0
```

### 3. Bunのインストール

npmを使用してBunをグローバルにインストール:

```bash
npm install -g bun
```

バージョンを確認:

```bash
bun --version
```

## プロジェクトのセットアップ

### 1. リポジトリのクローン

```bash
git clone <リポジトリURL>
cd <プロジェクト名>
```

### 2. 依存関係のインストール

```bash
bun install
```

## 開発サーバーの起動

以下のコマンドで開発サーバーを起動します:

```bash
bun start
```

アプリケーションは <http://localhost:3000> でアクセスできます。

## ホットリロード

この開発環境では、ソースコードを変更すると自動的にアプリケーションが再読み込みされます。

ホットリロードが機能しているか確認するには:

1. 開発サーバーを起動
2. ブラウザで <http://localhost:3000> を開く
3. ソースコード（例: `src/App.tsx`）を編集して保存
4. ブラウザが自動的に更新されることを確認

## トラブルシューティング

### 依存関係のインストールに関する問題

依存関係のインストールに問題がある場合:

```bash
rm -rf node_modules
bun install
```

### ポートの競合

ポート3000が既に使用されている場合は、環境変数PORTを設定して別のポートを使用できます:

```bash
PORT=3001 bun start
```

### Bunのバージョンの問題

Bunのバージョンに関する問題がある場合は、最新バージョンに更新してください:

asdfの場合:

```bash
asdf install bun latest
asdf global bun latest
```

npmの場合:

```bash
npm install -g bun@latest
```

### パフォーマンスの最適化

ホットリロードのパフォーマンスを向上させるには、以下の環境変数を設定できます:

```bash
FAST_REFRESH=true bun start
```

または、`.env.local`ファイルを作成して以下を追加:

```bash
FAST_REFRESH=true
```
