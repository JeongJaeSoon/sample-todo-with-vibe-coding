# デザインガイドライン

## 概要

[vibes](https://vibes.freee.co.jp/)はfreee社のデザインシステムで、将来的に導入を検討しています。vibesの使用は必須ではなく、可能な限りvibesを使用することを推奨していますが、必要に応じてstyled-componentsを代替手段として使用することも可能です。

## 導入方法

```bash
pnpm add @freee_jp/vibes
```

## 主な特徴

- 一貫性のあるUIコンポーネント
- アクセシビリティ対応
- レスポンシブデザインサポート
- 豊富なレイアウトコンポーネント

## 代替手段 : styled-components

vibesが使用できない場合は、styled-componentsを使用して実装してください :

```bash
# styled-componentsのインストール
pnpm add styled-components
pnpm add -D @types/styled-components
```

## 注意点

- vibesは現在導入されていません（将来的な検討事項）
- 導入時はアクセシビリティとパフォーマンスに注意
- 可能な限りvibesを使用し、必要な場合のみstyled-componentsで同様の機能とデザインを実現してください
