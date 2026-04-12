// npm install lucide-react recharts firebase
import React, { useState, useEffect } from 'react';
import { Check, X, Home, ChevronRight, List, BookOpen, LogOut, Save } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

// ==========================================
// 1. Firebase Configuration & App Constants
// ==========================================
// TODO: 本番環境のFirebase設定値に書き換えてください
const firebaseConfig = {
  apiKey: "AIzaSyCyo4bAZwqaN2V0g91DehS6mHmjZD5XJTc",
  authDomain: "sabu-hide-web-app.firebaseapp.com",
  projectId: "sabu-hide-web-app",
  storageBucket: "sabu-hide-web-app.firebasestorage.app",
  messagingSenderId: "145944786114",
  appId: "1:145944786114:web:0da0c2d87a9e24ca6cf75b",
  measurementId: "G-XSS72H1ZKV"
};

// アプリごとの固有ID（他のアプリとデータが混ざらないようにするため）
const APP_ID = "financial-quiz-4_3";

let app, db;
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

// ==========================================
// 2. Quiz Data (全21問収録、図表はTailwindで再現)
// ==========================================
const quizData = [
  {
    id: 1,
    title: "問題 1 情報システムの処理形態",
    question: "次の情報処理システムの処理形態に関する説明として、最も不適切なものはどれか。",
    options: [
      "顧客のスマートフォンから、列車や航空機の座席予約を行えるようにするためには、OLTP（オンライントランザクション処理）が必要である。",
      "全国店舗の現在の売上高・受注高を表示するために必要なのは、リモートバッチ処理である。",
      "店舗の閉店後に、その日の売上データを集計するのに必要なのはバッチ処理である。",
      "工業用ロボットの自動運転システムや、航空管制システムのように、即座の対応が求められるシステムにはリアルタイム制御処理が必要である。"
    ],
    answerIndex: 1,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold text-blue-800 mb-2">ここが重要</p>
          <p>本問では情報システムの処理形態について問われています。処理のタイミングや応答速度で分類すると以下のようになります。</p>
          <ul className="list-disc ml-5 mt-2 space-y-2">
            <li><strong>バッチ処理:</strong> 一定期間の処理をまとめて一括で行う。例：月末の売上集計、夜間のバックアップ。通信回線を用いるものをリモートバッチ処理と呼ぶ。</li>
            <li><strong>OLTP（オンライントランザクション処理）:</strong> 取引の度にリアルタイムで処理が行われ、整合性が求められる。例：銀行のATM、オンライン販売。</li>
            <li><strong>リアルタイム制御処理:</strong> 処理要求発生時に即座に処理を行い結果を返す。例：工業用ロボットの自動運転、航空管制システム。</li>
          </ul>
        </div>
        <div>
          <p><strong>ア ○：</strong> 予約が重複しないよう整合性を保つためOLTPが必要。適切。</p>
          <p><strong>イ ×：</strong> 現在の売上高などを整合性を保ちながら記録・把握するにはOLTPが必要。バッチ処理では現在の状態を把握できないため不適切。</p>
          <p><strong>ウ ○：</strong> 1日分のデータを蓄積して夜間に算出するためバッチ処理が必要。適切。</p>
          <p><strong>エ ○：</strong> 即座に処理を行い結果を返すためリアルタイム制御処理が必要。適切。</p>
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: "問題 2 クライアントサーバシステム",
    question: "3階層クライアントサーバシステムに関する説明として、適切なものはどれか。",
    options: [
      "ファンクション層では、ユーザからの入力受付機能を提供する。",
      "プレゼンテーション層では、データの加工処理を行う。",
      "プレゼンテーション層、ファンクション層、データベース層は、別々のコンピュータに配置することも、同じコンピュータに配置することも出来る。",
      "ファンクション層とデータベース層は同じコンピュータに配置する必要がある。"
    ],
    answerIndex: 2,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold text-blue-800 mb-2">ここが重要</p>
          <p>クライアントサーバシステムには2階層と3階層があります。</p>
          <ul className="list-disc ml-5 mt-2 space-y-2">
            <li><strong>プレゼンテーション層:</strong> ユーザインターフェースを提供（例：Webブラウザ）</li>
            <li><strong>ファンクション層（アプリケーション層）:</strong> データの加工処理（ビジネスロジック）を行う（例：アプリケーションサーバ）</li>
            <li><strong>データベース層:</strong> データの保存・管理を行う（例：データベースサーバ）</li>
          </ul>
          <p className="mt-2 text-sm">これらは論理的な区分であるため、物理的な配置には様々なパターンが存在します。</p>
        </div>
        <div>
          <p><strong>ア ×：</strong> 入力受付機能を提供するのはプレゼンテーション層。</p>
          <p><strong>イ ×：</strong> データの加工処理を行うのはファンクション層。</p>
          <p><strong>ウ ○：</strong> 論理的な区分であるため、物理的配置に制約はなく適切。</p>
          <p><strong>エ ×：</strong> 同じコンピュータに配置する制限はないため不適切。</p>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: "問題 3 ネットワークの負荷分散システム",
    question: "ネットワークの負荷分散システムに関する記述として、最も適切なものはどれか。",
    options: [
      "ロードバランサの負荷分散方式の１つであるアダプティブ方式とは、事前に設定された割り当て比率に応じて、クライアントからのリクエストを振り分ける方式のことである。",
      "ロードバランサの負荷分散方式の１つであるラウンドロビン方式は、応答時間が短いサーバにリクエストを振り分ける比率を多くする方式である。",
      "ロードバランサは、外部から送られてくるデータや処理要求を、複数のサーバに振り分け、一台あたりの負荷を抑える装置である。",
      "ロードバランサとは、複数のプロバイダと契約し、インターネット回線の冗長化を行う際に用いられる装置である。"
    ],
    answerIndex: 2,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold text-blue-800 mb-2">ここが重要</p>
          <p>ロードバランサは、外部からの処理要求を複数のサーバに振り分け、負荷を抑える装置です。障害発生時にはそのサーバを切り離してシステム稼働を継続します。</p>
          <p className="mt-2 text-sm">主な分散方式: ラウンドロビン（均等）、重み付けラウンドロビン、最速応答時間、最小接続数、アダプティブ方式（状況に合わせて総合的に判断）など。</p>
        </div>
        <div>
          <p><strong>ア ×：</strong> アダプティブ方式はサーバの変化や状況に合わせて振り分ける方式。</p>
          <p><strong>イ ×：</strong> ラウンドロビン方式は均等に振り分ける方式。</p>
          <p><strong>ウ ○：</strong> ロードバランサの正しい記述。</p>
          <p><strong>エ ×：</strong> 複数プロバイダでインターネット回線の冗長化を行うのはマルチホーミング。</p>
        </div>
      </div>
    )
  },
  {
    id: 4,
    title: "問題 4 情報システムの性能1",
    question: "情報システムの性能に関する次の文中の空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\nシステムに何らかの処理要求を送り終えてから、始めの結果が返ってくるまでの応答時間のことを（ Ａ ）という。一方、処理要求の入力を開始してから、全ての処理結果が出力されるまでの時間のことを（ Ｂ ）という。\n単位時間あたりに実行される処理件数を（ Ｃ ）という。例えば、1時間あたりに実行されるトランザクション数などが（ Ｃ ）に当たる。\nベンチマークテストで処理速度を測定する単位の一つである（ Ｄ ）は、1秒間に実行できる浮動小数点演算の数を表したものである。",
    options: [
      "Ａ：レスポンスタイム Ｂ：ターンアラウンドタイム Ｃ：オーバーヘッド Ｄ：FLOPS",
      "Ａ：レスポンスタイム Ｂ：ターンアラウンドタイム Ｃ：スループット Ｄ：FLOPS",
      "Ａ：ターンアラウンドタイム Ｂ：レスポンスタイム Ｃ：オーバーヘッド Ｄ：MIPS",
      "Ａ：ターンアラウンドタイム Ｂ：レスポンスタイム Ｃ：スループット Ｄ：MIPS"
    ],
    answerIndex: 1,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold text-blue-800 mb-2">ここが重要</p>
          <div className="border border-gray-300 p-2 my-2 bg-white flex flex-col text-sm">
             <div className="flex justify-between w-full mb-1 text-blue-700 font-bold px-2">
               <span>入力開始 ▼</span>
               <span>要求開始 ▼</span>
               <span>表示開始 <span className="text-red-600">▼</span></span>
               <span>表示終了 <span className="text-red-600">▼</span></span>
             </div>
             <div className="flex w-full h-10">
               <div className="flex-1 bg-cyan-100 border border-gray-400 flex items-center justify-center">入力</div>
               <div className="flex-[2] bg-yellow-100 border border-gray-400 flex items-center justify-center">処理</div>
               <div className="flex-1 bg-orange-100 border border-gray-400 flex items-center justify-center">表示</div>
             </div>
             <div className="w-full relative h-16 mt-2 text-xs">
                {/* レスポンスタイム */}
                <div className="absolute top-0 left-[25%] right-[25%] border-b-2 border-dashed border-gray-500 h-2"></div>
                <div className="absolute top-2 left-0 w-full flex justify-center text-red-600 font-bold">レスポンスタイム</div>
                {/* ターンアラウンドタイム */}
                <div className="absolute top-8 left-0 right-0 border-b-2 border-dashed border-gray-500 h-2"></div>
                <div className="absolute top-10 left-0 w-full flex justify-center text-red-600 font-bold">ターンアラウンドタイム</div>
             </div>
          </div>
          <p><strong>A: レスポンスタイム</strong> (要求後、始めの結果が返るまで)</p>
          <p><strong>B: ターンアラウンドタイム</strong> (入力開始から全結果出力まで)</p>
          <p><strong>C: スループット</strong> (単位時間あたりの処理件数)</p>
          <p><strong>D: FLOPS</strong> (1秒間に実行できる浮動小数点演算の数)</p>
        </div>
      </div>
    )
  },
  {
    id: 5,
    title: "問題 5 情報システムの性能2",
    question: "情報システムの性能に関する説明として、最も不適切なものはどれか。",
    options: [
      "ある処理を行うために、間接的・付加的に必要となる処理やシステムリソースのことをオーバーヘッドという。",
      "1台のコンピュータで同時に複数の処理を並行して行う機能のことをマルチタスクという。マルチタスクでは、例えば、同時に複数のアプリケーションを実行することができる。",
      "サイクルタイムとは、繰り返される一連の作業プロセスにおいて、その一周期にかかる時間のことである。",
      "CPUが記憶装置にデータを書き込み、読み出しを行うのに必要な時間のことをレスポンスタイムという。"
    ],
    answerIndex: 3,
    explanation: (
      <div className="space-y-4">
        <div>
          <p><strong>ア ○：</strong> オーバーヘッドの適切な説明。</p>
          <p><strong>イ ○：</strong> マルチタスクの適切な説明。</p>
          <p><strong>ウ ○：</strong> サイクルタイムの適切な説明。</p>
          <p><strong>エ ×：</strong> CPUが記憶装置にデータを書き込み・読み出しを行うのに必要な時間は「アクセスタイム」です。レスポンスタイムではありません。</p>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: "問題 6 情報システムの性能3",
    question: "通信品質の指標に関する記述として、最も適切なものはどれか。",
    options: [
      "レイテンシとは、単位時間あたりに実行される処理件数のことである。",
      "レイテンシが小さいと、データの送信と到着に時間がかかるため、スループットが低下する可能性がある。",
      "ジッタとは、デジタル信号の品質を示す指標のひとつで、信号を伝送する際に生じる時間軸方向のズレや揺らぎのことである。",
      "ジッタが大きい環境でPing値を連続で測定すると、Ping値の最大値と最小値の差は小さくなる。"
    ],
    answerIndex: 2,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold text-blue-800 mb-2">ここが重要</p>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li><strong>レイテンシ:</strong> 転送要求を出してから実際にデータが送られてくるまでに生じる通信の遅延時間。</li>
            <li><strong>ジッタ:</strong> 信号を伝送する際に生じる時間軸方向のズレや揺らぎ。音声や映像の乱れの原因となる。</li>
          </ul>
        </div>
        <div>
          <p><strong>ア ×：</strong> 単位時間あたりの処理件数はスループット。</p>
          <p><strong>イ ×：</strong> レイテンシが「大きい」と遅延が発生し、スループットが低下する。</p>
          <p><strong>ウ ○：</strong> ジッタの適切な説明。</p>
          <p><strong>エ ×：</strong> ジッタが大きいとは、Ping値の最大値と最小値の差が「大きく」なることを意味する。</p>
        </div>
      </div>
    )
  },
  {
    id: 7,
    title: "問題 7 情報システムの信頼性",
    question: "情報システムの信頼性に関する説明として、最も不適切なものはどれか。",
    options: [
      "信頼性は平均故障間隔（MTBF）という指標で評価される。MTBFは故障を修理して回復してから、次の故障が発生するまでの平均時間を表す。",
      "保守性は平均修理時間（MTTR）という指標で評価される。MTTRは故障が発生した場合に、修理にかかる平均時間を表す。",
      "可用性は稼働率という指標で評価される。稼働率はシステムの運用時間に占める、稼働時間の割合を表す。",
      "フェールセーフとは、故障が発生した際に、処理を中断することなく機能を維持するシステム構成を表す。"
    ],
    answerIndex: 3,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold text-blue-800 mb-2">ここが重要 (RAS)</p>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li><strong>Reliability (信頼性):</strong> 故障しない。指標はMTBF。</li>
            <li><strong>Availability (可用性):</strong> 常に利用できる。指標は稼働率。</li>
            <li><strong>Serviceability (保守性):</strong> 早く回復できる。指標はMTTR。</li>
          </ul>
        </div>
        <div>
          <p><strong>ア ○：</strong> 適切。</p>
          <p><strong>イ ○：</strong> 適切。</p>
          <p><strong>ウ ○：</strong> 適切。</p>
          <p><strong>エ ×：</strong> 故障時に処理を中断せず機能を維持するのは「フェールソフト」です。フェールセーフは、安全な方向に動作させる設計概念（例：ストーブが倒れたら消火）です。</p>
        </div>
      </div>
    )
  },
  {
    id: 8,
    title: "問題 8 信頼性の計算",
    question: "あるシステムの運用経過が下図に示されている。このシステムの平均故障間隔（MTBF）について最も適切なものを選べ。\n稼働：[120時間] -> 修理：[3時間] -> 稼働：[100時間] -> 修理：[4時間] -> 稼働：[140時間] -> 修理：[2時間]",
    options: [
      "120時間",
      "123時間",
      "128時間",
      "130時間"
    ],
    answerIndex: 0,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold text-blue-800 mb-2">ここが重要</p>
          <p>MTBF ＝ 稼働時間の合計 ÷ 故障回数</p>
        </div>
        <div>
          <p>稼働時間は 120時間, 100時間, 140時間 で合計 360時間。</p>
          <p>故障回数は 3回。</p>
          <p>MTBF ＝ 360時間 ÷ 3回 ＝ 120時間</p>
          <p className="text-sm text-gray-600 mt-2">※修理時間の長さはMTBFの計算には関係ありません。</p>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "問題 9 可用性の計算",
    question: "あるシステムの運用経過が下図に示されている。このシステムの稼働率について最も適切なものを選べ。\n稼働：[120時間] -> 修理：[12時間] -> 稼働：[100時間] -> 修理：[18時間] -> 稼働：[140時間] -> 修理：[10時間]",
    options: [
      "75%",
      "80%",
      "85%",
      "90%"
    ],
    answerIndex: 3,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold text-blue-800 mb-2">ここが重要</p>
          <p>稼働率 ＝ 稼働時間の合計 ÷ 運用時間（稼働＋修理の合計）</p>
          <p>または、稼働率 ＝ MTBF ÷ (MTBF ＋ MTTR)</p>
        </div>
        <div>
          <p>稼働時間の合計 ＝ 120 + 100 + 140 ＝ 360時間</p>
          <p>修理時間の合計 ＝ 12 + 18 + 10 ＝ 40時間</p>
          <p>運用時間の合計 ＝ 360 + 40 ＝ 400時間</p>
          <p>稼働率 ＝ 360 ÷ 400 ＝ 0.9 ＝ 90%</p>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "問題 10 保守性の計算",
    question: "あるシステムの運用経過が下図に示されている。このシステムの平均修理時間（MTTR）について最も適切なものを選べ。\n稼働：[120時間] -> 修理：[3時間] -> 稼働：[100時間] -> 修理：[4時間] -> 稼働：[140時間] -> 修理：[2時間]",
    options: [
      "1.5時間",
      "2時間",
      "3時間",
      "6時間"
    ],
    answerIndex: 2,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold text-blue-800 mb-2">ここが重要</p>
          <p>MTTR ＝ 修理時間の合計 ÷ 故障回数</p>
        </div>
        <div>
          <p>修理時間は 3時間, 4時間, 2時間 で合計 9時間。</p>
          <p>故障は全部で 3回。</p>
          <p>MTTR ＝ 9時間 ÷ 3回 ＝ 3時間</p>
          <p className="text-sm text-gray-600 mt-2">※稼働時間の長さはMTTRの計算には関係ありません。</p>
        </div>
      </div>
    )
  },
  {
    id: 11,
    title: "問題 11 直列方式と並列方式の稼働率計算",
    question: "稼働率が90%のメインサーバと、稼働率が80%のサブサーバがある。この2台のサーバを並列に接続した場合と、直列で接続した場合のそれぞれにおけるシステム全体の稼働率について適切なものを選べ。",
    options: [
      "並列方式 72%、直列方式 72%",
      "並列方式 72%、直列方式 98%",
      "並列方式 85%、直列方式 80%",
      "並列方式 98%、直列方式 72%",
      "並列方式 98%、直列方式 80 %"
    ],
    answerIndex: 3,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold text-blue-800 mb-2">ここが重要</p>
          <ul className="list-disc ml-5 space-y-1 text-sm">
            <li><strong>並列方式:</strong> 1 - (1 - Aの稼働率) × (1 - Bの稼働率)</li>
            <li><strong>直列方式:</strong> Aの稼働率 × Bの稼働率</li>
          </ul>
        </div>
        <div>
          <p>【並列方式】 1 - (1 - 0.90) × (1 - 0.80) = 1 - 0.1 × 0.2 = 1 - 0.02 = 0.98 (98%)</p>
          <p>【直列方式】 0.90 × 0.80 = 0.72 (72%)</p>
        </div>
      </div>
    )
  },
  {
    id: 12,
    title: "問題 12 情報システムの高信頼化へのアプローチ",
    question: "情報システムの信頼性を高めるアプローチに関する次の文中の空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\n故障や障害が発生しないよう対処する取り組みを、( Ａ )という。あらかじめ故障を想定して情報システムを設計することが重要となる。\nこのような高信頼化へのアプローチには、故障や障害が発生したときも主な機能の動作が続行できるように設計する( Ｂ )、故障や障害が発生した場合、システムの被害を最小限にとどめる動作をさせる( Ｃ )などがある。また、故障が発生した際に、処理を中断することなく機能を維持するシステム構成方法を( Ｄ )という。",
    options: [
      "Ａ：フォールトアボイダンス Ｂ：フェールセーフ Ｃ：フェールソフト Ｄ：フォールトトレランス",
      "Ａ：フォールトアボイダンス Ｂ：フォールトトレランス Ｃ：フェールセーフ Ｄ：フェールソフト",
      "Ａ：フェールセーフ Ｂ：フォールトアボイダンス Ｃ：フォールトトレランス Ｄ：フェールソフト",
      "Ａ：フェールセーフ Ｂ：フォールトトレランス Ｃ：フェールソフト Ｄ：フォールトアボイダンス"
    ],
    answerIndex: 1,
    explanation: (
      <div className="space-y-4">
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li><strong>フォールトアボイダンス (A):</strong> 故障や障害が発生しないよう事前に対処し回避する取り組み。</li>
          <li><strong>フォールトトレランス (B):</strong> 故障時も主な機能を低下させずに続行できるように設計すること（二重化など）。</li>
          <li><strong>フェールセーフ (C):</strong> 故障時に被害を最小限にとどめ、安全な方向（停止など）に動作させる設計。</li>
          <li><strong>フェールソフト (D):</strong> 故障時に処理を中断することなく、機能が低下しても維持するシステム構成。</li>
        </ul>
      </div>
    )
  },
  {
    id: 13,
    title: "問題 13 システムとデータの保護1",
    question: "業務に必要となるシステムやデータを保護するための、さまざまな機能がある。空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\n（ Ａ ）バックアップは、前回フルバックアップからの差分だけをバックアップする。\n（ Ｂ ）バックアップは、直前のバックアップとの差分だけをバックアップする。\n（ Ｃ ）は、ハードディスクを2重に持つ構成である。\n（ Ｄ ）は、2つのシステムを用意しておき、片方は待機しておき、障害発生時に切り替えて運用する。",
    options: [
      "Ａ：増分 Ｂ：差分 Ｃ：ミラーリング Ｄ：デュアルシステム",
      "Ａ：差分 Ｂ：増分 Ｃ：ミラーリング Ｄ：デュプレックスシステム",
      "Ａ：差分 Ｂ：増分 Ｃ：レプリケーション Ｄ：デュプレックスシステム",
      "Ａ：増分 Ｂ：差分 Ｃ：レプリケーション Ｄ：デュアルシステム"
    ],
    answerIndex: 1,
    explanation: (
      <div className="space-y-4">
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li><strong>差分バックアップ (A):</strong> 「前回のフルバックアップ」から変更された部分だけを毎回バックアップ。</li>
          <li><strong>増分バックアップ (B):</strong> 「直前のバックアップ」（フル・差分・増分問わず）からの差分だけをバックアップ。</li>
          <li><strong>ミラーリング (C):</strong> ハードディスクを2重に持つ構成（RAID 1など）。</li>
          <li><strong>デュプレックスシステム (D):</strong> 片方を待機系とし、障害時に切り替える構成。（※デュアルシステムは両方で同時に同じ処理を行う）</li>
        </ul>
      </div>
    )
  },
  {
    id: 14,
    title: "問題 14 システムとデータの保護2",
    question: "システムやデータを保護する機能の説明として、最も不適切なものはどれか。",
    options: [
      "UPS（無停電電源装置）とは、停電などで電源供給が停止した場合でも、一定時間、電力を供給する装置である。",
      "クラスタリングとは、独立して動作する物理的に複数のコンピュータを相互に接続し、全体として信頼性の高い、論理的に1台のコンピュータシステムを構築する形態である。",
      "フェールセーフとは、故障が発生した際に、処理を中断することなく機能を維持するシステム構成方法である。",
      "RAIDとは複数のハードディスクを構成することにより、ハードディスクの性能や信頼性を向上する技術である。"
    ],
    answerIndex: 2,
    explanation: (
      <div className="space-y-4">
        <div>
          <p><strong>ア ○：</strong> UPSの適切な説明。</p>
          <p><strong>イ ○：</strong> クラスタリングの適切な説明。</p>
          <p><strong>ウ ×：</strong> 故障時に処理を中断せず機能を維持するのは「フェールソフト」です。フェールセーフは安全な方向に動作（安全に停止など）させる概念です。</p>
          <p><strong>エ ○：</strong> RAIDの適切な説明。</p>
        </div>
      </div>
    )
  },
  {
    id: 15,
    title: "問題 15 通信速度",
    question: "2台の端末がスイッチングハブにツイストペアケーブルで接続されている。この2台の端末間では、100MBのファイル転送を1分以内に終わらせたい。2台の端末およびスイッチングハブに必要な規格として、最も適切なものはどれか。",
    options: [
      "10BASE-T",
      "100BASE-TX",
      "100BASE-FX",
      "1000BASE-LX"
    ],
    answerIndex: 1,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md text-sm">
          <p className="font-bold text-blue-800 mb-2">計算方法と規格の選択</p>
          <p>1MB = 1024 × 1024 B = 1,048,576 B</p>
          <p>1B = 8ビットなので、100MB ＝ 100 × 1,048,576 × 8 ＝ 838,860,800 ビット</p>
          <p>1分(60秒)で転送するための必要速度: 838,860,800 ÷ 60 ≒ 13.98 Mbps</p>
          <p className="mt-2">つまり、10Mbps（10BASE-T）では間に合わず、100Mbps以上が必要です。</p>
          <p className="mt-2">さらに「ツイストペアケーブル（銅線）」で接続されているため、光ファイバを用いる「-FX」や「-LX」は不適切です。</p>
          <p>よって、100Mbpsでツイストペアケーブルを用いる <strong>100BASE-TX</strong> が正解となります。</p>
        </div>
      </div>
    )
  },
  {
    id: 16,
    title: "問題 16 データ送信時間",
    question: "通信速度64kbpsの専用線で接続された端末間で、1MBのファイルを転送するとき、このデータの送受信にかかるおおよその時間について最も適切なものを選べ。ただし、計算には制御情報などのオーバーヘッドは含めず、回線速度とファイルサイズのみから算出すること。",
    options: [
      "16秒",
      "32秒",
      "64秒",
      "131秒"
    ],
    answerIndex: 3,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md text-sm">
          <p className="font-bold text-blue-800 mb-2">計算方法</p>
          <p>1. ファイルサイズをビットに変換（データ容量は1K=1024で計算）</p>
          <p>1MB ＝ 1024 × 1024 × 8ビット ＝ 8,388,608 ビット</p>
          <p>2. 通信速度をbpsに変換（通信速度は1K=1000で計算）</p>
          <p>64kbps ＝ 64 × 1000 ＝ 64,000 bps（ビット/秒）</p>
          <p>3. 転送時間を計算</p>
          <p>8,388,608 ÷ 64,000 ≒ 131.07秒</p>
          <p className="mt-2 text-gray-600">※概算として 1MBを 1,000,000 × 8 = 8,000,000 ビットとして計算しても、8,000,000 ÷ 64,000 = 125秒 となり、選択肢の中で最も近いエ(131秒)を選ぶことができます。</p>
        </div>
      </div>
    )
  },
  {
    id: 17,
    title: "問題 17 LAN接続機器",
    question: "LAN接続に利用される機器の役割について、次の文中の空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\n（ Ａ ）は、この機器に届いたデータを他の全てのポートに転送する。OSI参照モデルでは、物理層に属する。\n（ Ｂ ）は、データリンク層に属する機器で、宛先MACアドレスに基づいて、宛先となるポートだけにデータを転送する。\n（ Ｃ ）は、ネットワーク層に属する機器で、LANとWANなど、異なるネットワークを接続する。\n（ Ｄ ）は、コンピュータやプリンタをネットワークに接続するNICに割り当てられており、同一セグメント内のLAN通信に利用される。",
    options: [
      "Ａ：リピータハブ Ｂ：スイッチングハブ Ｃ：ルータ Ｄ：MACアドレス",
      "Ａ：スイッチングハブ Ｂ：リピータハブ Ｃ：ルータ Ｄ：MACアドレス",
      "Ａ：ルータ Ｂ：スイッチングハブ Ｃ：MACアドレス Ｄ：リピータハブ",
      "Ａ：リピータハブ Ｂ：MACアドレス Ｃ：スイッチングハブ Ｄ：ルータ"
    ],
    answerIndex: 0,
    explanation: (
      <div className="space-y-4">
        <ul className="list-disc ml-5 space-y-2 text-sm">
          <li><strong>リピータハブ (A):</strong> 物理層。届いたデータを全ポートに転送する。</li>
          <li><strong>スイッチングハブ (B):</strong> データリンク層。MACアドレスを記憶し、宛先ポートのみに転送するため衝突が減る。</li>
          <li><strong>ルータ (C):</strong> ネットワーク層。IPアドレスに基づき異なるネットワーク間を接続・ルーティングする。</li>
          <li><strong>MACアドレス (D):</strong> NIC（ネットワークインターフェースカード）に割り当てられた物理的な住所。</li>
        </ul>
      </div>
    )
  },
  {
    id: 18,
    title: "問題 18 LAN",
    question: "1つのセグメントからなるLANを構築した。このLANに関する記述として、最も適切なものはどれか。\n【構成】\n・PC-A (無線LAN内蔵)\n・PC-B (100Mbps NIC内蔵)\n・LAN対応プリンタ\nこれらが「無線LAN対応・100Mbps対応スイッチングハブ内蔵ブロードバンドルータ (IPマスカレード有効)」を介してインターネットに接続されている。",
    options: [
      "PC-A（無線LAN）とPC-B（有線LAN）の間はデータ通信することができない。",
      "インターネットに接続したいPCには、グローバルIPアドレスを割り当てる必要がある。",
      "PC-A（無線LAN）からLAN対応プリンタを利用する場合、PC-Aは有線LANに接続しなおす必要がある。",
      "PC-Aとブロードバンドルータ間の接続がIEEE802.11b（通信速度11Mbps）で接続されている場合、PC-AとPC-B間の通信速度は、最大で11Mbpsとなる。"
    ],
    answerIndex: 3,
    explanation: (
      <div className="space-y-4">
        <div>
          <p><strong>ア ×：</strong> ルータを介して同一セグメント内にあるため通信可能。伝送媒体が異なっても問題ありません。</p>
          <p><strong>イ ×：</strong> IPマスカレード（NAT/NAPT）が有効なため、PCにはプライベートIPアドレスが割り当てられていれば通信可能です。</p>
          <p><strong>ウ ×：</strong> 無線からルータ経由で有線プリンタを利用可能。接続し直す必要はありません。</p>
          <p><strong>エ ○：</strong> PC-A〜ルータ間が11Mbps、ルータ〜PC-B間が100Mbpsの場合、全体の通信速度は遅い方の11Mbpsに制限されます。</p>
        </div>
      </div>
    )
  },
  {
    id: 19,
    title: "問題 19 LAN、ネットワーク",
    question: "LANやネットワークに関する記述のうち、最も不適切なものはどれか。",
    options: [
      "WANは、本社－支店間などの地理的に離れた拠点のLAN同士を接続することである。",
      "VPNは、社外からインターネットを経由してPCを社内LANに接続する際、通信のセキュリティを確保するために使われる。",
      "無線LANと有線LANは、同じ事業所内の同一セグメントでは併用することができない。",
      "IPv6は、IPアドレス空間の枯渇問題を解消するため、IPv4にかわるプロトコルとして設計された。"
    ],
    answerIndex: 2,
    explanation: (
      <div className="space-y-4">
        <div>
          <p><strong>ア ○：</strong> WAN（Wide Area Network）の適切な記述。</p>
          <p><strong>イ ○：</strong> VPN（Virtual Private Network）の適切な記述。</p>
          <p><strong>ウ ×：</strong> 無線LANアクセスポイント（ルータ）を介して、有線LANと無線LANは同一セグメントで併用することができます。不適切です。</p>
          <p><strong>エ ○：</strong> IPv6（128ビット）の適切な記述。</p>
        </div>
      </div>
    )
  },
  {
    id: 20,
    title: "問題 20 無線LAN",
    question: "無線LANは、その通信速度の高速化に伴い、急速に普及している。無線LANに関する記述として、最も不適切なものはどれか。",
    options: [
      "ある事務所にパソコンが3台以上あり、お互いに通信する必要がある場合には、インフラストラクチャーモードを利用しなければならない。",
      "ブリッジタイプとして設定された無線LANアクセスポイントは、IPルーティングを行うので、IPアドレスが設定されていなければならない。",
      "事務所内のLANだけでなく、インターネットへも接続する無線LANアクセスポイントは、ルータタイプとして設定される。",
      "無線LANアクセスポイントと、無線LANを利用する端末やプリンタは、共通のSSIDを設定する。"
    ],
    answerIndex: 1,
    explanation: (
      <div className="space-y-4">
        <div>
          <p><strong>ア ○：</strong> 機器同士が直接通信するアドホックモードに対し、アクセスポイントを介して複数機器が通信するにはインフラストラクチャーモードが必要です。</p>
          <p><strong>イ ×：</strong> ブリッジタイプはデータ転送の中継（MACアドレスによる制御）を行うだけで、IPルーティングは行いません。そのためIPアドレスの設定は必須ではありません。不適切です。</p>
          <p><strong>ウ ○：</strong> 異なるネットワーク（LANとインターネット）を接続するにはルータタイプが必要です。</p>
          <p><strong>エ ○：</strong> アクセスポイントを識別するため、端末側にも共通のSSIDを設定します。</p>
        </div>
      </div>
    )
  },
  {
    id: 21,
    title: "問題 21 無線LAN2",
    question: "無線通信技術に関する記述として、最も適切なものを選べ。",
    options: [
      "無線LAN 規格IEEE802.11acに対応する機器は、2.4 GHz 帯を利用するのでBluetoothを使用する機器から電波干渉を受ける。",
      "無線LAN 規格IEEE802.11axは、Wi-Fi 6と呼ばれることもある。",
      "無線LANの電波干渉が発生している場合、使用する周波数帯を変更した場合でも電波干渉の対策にはならない。",
      "5GHz帯の周波数帯を使った無線LAN通信は通信速度が速く、通信距離が離れても通信が安定しているという特徴がある。"
    ],
    answerIndex: 1,
    explanation: (
      <div className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-md text-sm">
          <p className="font-bold text-blue-800 mb-2">周波数帯の特徴</p>
          <ul className="list-disc ml-5 space-y-1">
            <li><strong>2.4GHz帯:</strong> 壁や柱に強く遠くまで届くが、Bluetoothや電子レンジ等と干渉しやすい。(11b, 11g, 11nなど)</li>
            <li><strong>5GHz帯:</strong> 干渉しにくく安定・高速だが、遮蔽物に弱く距離が離れると不安定。(11a, 11acなど)</li>
          </ul>
        </div>
        <div>
          <p><strong>ア ×：</strong> 11acは 5GHz帯 を使用するため、2.4GHz帯のBluetoothとは干渉しにくい。</p>
          <p><strong>イ ○：</strong> IEEE802.11ax は Wi-Fi 6 のことです。適切。</p>
          <p><strong>ウ ×：</strong> 2.4GHz帯から5GHz帯に変更することで電波干渉の対策になります。</p>
          <p><strong>エ ×：</strong> 5GHz帯は通信速度は速いですが、通信距離が離れると不安定になります。</p>
        </div>
      </div>
    )
  }
];

// ==========================================
// 3. Main Application Component
// ==========================================
export default function QuizApp() {
  const [userId, setUserId] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userProgress, setUserProgress] = useState({});
  const [currentMode, setCurrentMode] = useState(null); // null (menu), 'all', 'wrong', 'review', 'history'
  const [activeQuizList, setActiveQuizList] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);

  // Firestoreからデータ取得
  const fetchProgress = async (uid) => {
    if (!db) {
        console.log("Firebase not initialized. Using local empty state.");
        setUserProgress({});
        return;
    }
    setLoading(true);
    try {
      console.log(`Fetching data for user: ${uid} in collection: quiz_history_${APP_ID}`);
      const docRef = doc(db, `quiz_history_${APP_ID}`, uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserProgress(docSnap.data().results || {});
      } else {
        setUserProgress({});
      }
    } catch (error) {
      console.error("Error fetching progress:", error);
      setUserProgress({});
    } finally {
      setLoading(false);
    }
  };

  // Firestoreへデータ保存
  const saveProgress = async (uid, newProgress) => {
    setUserProgress(newProgress);
    if (!db) return;
    try {
      const docRef = doc(db, `quiz_history_${APP_ID}`, uid);
      await setDoc(docRef, { results: newProgress }, { merge: true });
      console.log("Progress saved.");
    } catch (error) {
      console.error("Error saving progress:", error);
    }
  };

  // ログイン処理
  const handleLogin = (e) => {
    e.preventDefault();
    if (!userId.trim()) return;
    setIsLoggedIn(true);
    fetchProgress(userId.trim());
  };

  // モード開始
  const startQuiz = (mode) => {
    let targetList = [];
    if (mode === 'all') {
      targetList = [...quizData];
    } else if (mode === 'wrong') {
      targetList = quizData.filter(q => {
        const progress = userProgress[q.id];
        // 過去に解いて不正解だったもの
        return progress && progress.isCorrect === false;
      });
    } else if (mode === 'review') {
      targetList = quizData.filter(q => {
        const progress = userProgress[q.id];
        return progress && progress.needsReview === true;
      });
    }

    if (targetList.length === 0 && mode !== 'all') {
      alert("対象の問題がありません。");
      return;
    }

    setActiveQuizList(targetList);
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setIsAnswerRevealed(false);
    setCurrentMode(mode);
  };

  // 解答クリック
  const handleAnswerClick = (index) => {
    if (isAnswerRevealed) return; // 既に解答済みなら無視
    setSelectedAnswer(index);
    setIsAnswerRevealed(true);

    const currentQ = activeQuizList[currentQuizIndex];
    const isCorrect = index === currentQ.answerIndex;

    const currentRecord = userProgress[currentQ.id] || {};
    const newProgress = {
      ...userProgress,
      [currentQ.id]: {
        ...currentRecord,
        isCorrect: isCorrect,
        needsReview: currentRecord.needsReview || false,
        lastAttempt: new Date().toISOString()
      }
    };
    saveProgress(userId, newProgress);
  };

  // 要復習チェック切り替え
  const toggleReview = () => {
    const currentQ = activeQuizList[currentQuizIndex];
    const currentRecord = userProgress[currentQ.id] || {};
    const newReviewState = !currentRecord.needsReview;

    const newProgress = {
      ...userProgress,
      [currentQ.id]: {
        ...currentRecord,
        needsReview: newReviewState
      }
    };
    saveProgress(userId, newProgress);
  };

  // 次の問題へ
  const nextQuestion = () => {
    if (currentQuizIndex < activeQuizList.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerRevealed(false);
    } else {
      // 終了
      alert("お疲れ様でした！すべての問題を終了しました。");
      setCurrentMode(null);
    }
  };


  // --- Render Functions ---

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <div className="flex justify-center mb-6 text-blue-600">
            <BookOpen size={48} />
          </div>
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">スマート問題集 4-3</h1>
          <p className="text-center text-gray-500 mb-6 text-sm">システム構成とネットワーク</p>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">合言葉 (ユーザーID)</label>
              <input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="例: my-secret-key"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <p className="text-xs text-gray-400 mt-2">※同じ合言葉を使えば、スマホとPCで履歴を同期できます。</p>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition flex justify-center items-center gap-2"
            >
              学習を始める <ChevronRight size={20} />
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex flex-col items-center text-blue-600">
          <RefreshCw className="animate-spin mb-4" size={32} />
          <p className="font-medium">データを読み込み中...</p>
        </div>
      </div>
    );
  }

  // メインメニュー
  if (currentMode === null) {
    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
            <div>
              <p className="text-sm text-gray-500">ログイン中: <span className="font-bold text-gray-800">{userId}</span></p>
            </div>
            <button 
              onClick={() => { setIsLoggedIn(false); setUserId(''); }}
              className="text-gray-500 hover:text-red-500 flex items-center gap-1 text-sm transition"
            >
              <LogOut size={16} /> ログアウト
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
             <h1 className="text-2xl font-bold text-gray-800 mb-2">スマート問題集 4-3</h1>
             <p className="text-gray-600">システム構成とネットワーク (全{quizData.length}問)</p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => startQuiz('all')}
              className="bg-blue-600 text-white p-4 rounded-lg shadow-sm hover:bg-blue-700 transition flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <List size={24} />
                <div className="text-left">
                  <p className="font-bold text-lg">すべての問題</p>
                  <p className="text-blue-200 text-sm">第1問から順に解く</p>
                </div>
              </div>
              <ChevronRight size={24} />
            </button>

            <button
              onClick={() => startQuiz('wrong')}
              className="bg-red-500 text-white p-4 rounded-lg shadow-sm hover:bg-red-600 transition flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <X size={24} />
                <div className="text-left">
                  <p className="font-bold text-lg">前回不正解の問題</p>
                  <p className="text-red-200 text-sm">間違えた問題を復習する</p>
                </div>
              </div>
              <ChevronRight size={24} />
            </button>

            <button
              onClick={() => startQuiz('review')}
              className="bg-yellow-500 text-white p-4 rounded-lg shadow-sm hover:bg-yellow-600 transition flex justify-between items-center"
            >
              <div className="flex items-center gap-3">
                <AlertCircle size={24} />
                <div className="text-left">
                  <p className="font-bold text-lg">要復習の問題</p>
                  <p className="text-yellow-200 text-sm">チェックをつけた問題を解く</p>
                </div>
              </div>
              <ChevronRight size={24} />
            </button>
            
            <button
              onClick={() => setCurrentMode('history')}
              className="bg-white border-2 border-gray-200 text-gray-700 p-4 rounded-lg shadow-sm hover:bg-gray-50 transition flex justify-between items-center mt-4"
            >
              <div className="flex items-center gap-3">
                <BarChart2 size={24} className="text-gray-500" />
                <div className="text-left">
                  <p className="font-bold text-lg">学習履歴の確認</p>
                </div>
              </div>
              <ChevronRight size={24} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 履歴画面
  if (currentMode === 'history') {
    const attemptedCount = Object.keys(userProgress).length;
    const correctCount = Object.values(userProgress).filter(p => p.isCorrect).length;
    const reviewCount = Object.values(userProgress).filter(p => p.needsReview).length;
    
    const pieData = [
      { name: '正解', value: correctCount, color: '#10B981' },
      { name: '不正解/未解答', value: quizData.length - correctCount, color: '#E5E7EB' }
    ];

    return (
      <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2"><BarChart2 /> 学習履歴</h2>
            <button 
              onClick={() => setCurrentMode(null)}
              className="bg-white text-gray-600 px-4 py-2 rounded-md shadow-sm hover:bg-gray-50 flex items-center gap-2 text-sm font-medium transition"
            >
              <Home size={16} /> メニューに戻る
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 text-sm mb-1">全体の進捗</p>
              <p className="text-3xl font-bold text-blue-600">{attemptedCount} <span className="text-lg text-gray-400">/ {quizData.length}</span></p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 text-sm mb-1">正解数</p>
              <p className="text-3xl font-bold text-green-500">{correctCount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <p className="text-gray-500 text-sm mb-1">要復習チェック</p>
              <p className="text-3xl font-bold text-yellow-500">{reviewCount}</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-bold text-gray-800 mb-4">正答率</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
             <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
               <h3 className="font-bold text-gray-800">問題別ステータス</h3>
             </div>
             <ul className="divide-y divide-gray-200">
                {quizData.map((q) => {
                  const progress = userProgress[q.id];
                  return (
                    <li key={q.id} className="p-4 hover:bg-gray-50 flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm">{q.title}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {progress?.needsReview && <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded font-bold">要復習</span>}
                        {progress?.isCorrect === true && <Check className="text-green-500" size={20} />}
                        {progress?.isCorrect === false && <X className="text-red-500" size={20} />}
                        {!progress && <span className="text-gray-300 text-sm">-</span>}
                      </div>
                    </li>
                  )
                })}
             </ul>
          </div>
        </div>
      </div>
    );
  }

  // クイズ画面
  const currentQ = activeQuizList[currentQuizIndex];
  const qProgress = userProgress[currentQ?.id] || {};

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 flex flex-col">
      <div className="max-w-3xl w-full mx-auto flex-1 flex flex-col">
        {/* ヘッダー */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-full">
              {currentQuizIndex + 1} / {activeQuizList.length}
            </span>
          </div>
          <button 
            onClick={() => setCurrentMode(null)}
            className="text-gray-500 hover:text-gray-800 flex items-center gap-1 text-sm font-medium transition"
          >
            <X size={20} /> 中断して戻る
          </button>
        </div>

        {/* 問題エリア */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-4">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">{currentQ.title}</h2>
          <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{currentQ.question}</p>
        </div>

        {/* 選択肢エリア */}
        <div className="space-y-3 mb-8">
          {currentQ.options.map((option, idx) => {
            const isSelected = selectedAnswer === idx;
            const isCorrectAnswer = currentQ.answerIndex === idx;
            
            let btnClass = "w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ";
            
            if (!isAnswerRevealed) {
              btnClass += "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 text-gray-700";
            } else {
              if (isCorrectAnswer) {
                btnClass += "border-green-500 bg-green-50 text-green-900"; // 正解の選択肢は常に緑
              } else if (isSelected) {
                btnClass += "border-red-500 bg-red-50 text-red-900"; // 選んだ不正解は赤
              } else {
                btnClass += "border-gray-200 bg-gray-50 text-gray-400 opacity-60"; // それ以外はグレーダウン
              }
            }

            return (
              <button
                key={idx}
                disabled={isAnswerRevealed}
                onClick={() => handleAnswerClick(idx)}
                className={btnClass}
              >
                <div className="flex gap-3">
                  <span className="font-bold flex-shrink-0">
                    {['ア', 'イ', 'ウ', 'エ'][idx]}.
                  </span>
                  <span>{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* 解説エリア */}
        {isAnswerRevealed && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 animate-fade-in border-t-4 border-blue-500">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                  {selectedAnswer === currentQ.answerIndex ? (
                    <span className="text-green-600 flex items-center gap-1"><Check size={24}/> 正解！</span>
                  ) : (
                    <span className="text-red-600 flex items-center gap-1"><X size={24}/> 不正解...</span>
                  )}
                </h3>
                <p className="text-gray-600 text-sm">正解は <span className="font-bold text-gray-800">「{['ア', 'イ', 'ウ', 'エ'][currentQ.answerIndex]}」</span> です。</p>
              </div>
              
              <button
                onClick={toggleReview}
                className={`flex items-center gap-2 px-3 py-2 rounded-md border text-sm font-bold transition-colors ${
                  qProgress.needsReview 
                  ? 'bg-yellow-100 border-yellow-300 text-yellow-800' 
                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                }`}
              >
                <AlertCircle size={16} /> 
                {qProgress.needsReview ? '要復習リストに追加済み' : '要復習リストに追加'}
              </button>
            </div>
            
            <div className="text-gray-700">
              {currentQ.explanation}
            </div>
            
            <div className="mt-8 flex justify-end">
              <button
                onClick={nextQuestion}
                className="bg-blue-600 text-white py-3 px-8 rounded-md font-bold hover:bg-blue-700 transition flex items-center gap-2 shadow-sm"
              >
                {currentQuizIndex < activeQuizList.length - 1 ? '次の問題へ' : '結果を見る'} <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}