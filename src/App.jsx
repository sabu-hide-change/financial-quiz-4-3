// npm install lucide-react recharts firebase
import React, { useState, useEffect } from 'react';
import { Check, X, Home, ChevronRight, List, AlertCircle, RefreshCw, LogOut, CheckSquare, Square } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// ==========================================
// Firebase Configuration
// ==========================================
// TODO: 本番環境のFirebaseプロジェクトの設定値に書き換えてください
const firebaseConfig = {
  apiKey: "AIzaSyCyo4bAZwqaN2V0g91DehS6mHmjZD5XJTc",
  authDomain: "sabu-hide-web-app.firebaseapp.com",
  projectId: "sabu-hide-web-app",
  storageBucket: "sabu-hide-web-app.firebasestorage.app",
  messagingSenderId: "145944786114",
  appId: "1:145944786114:web:0da0c2d87a9e24ca6cf75b",
  measurementId: "G-XSS72H1ZKV"
};

// Firebaseの初期化（エラーハンドリング付き）
let db = null;
try {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

// アプリケーション固有のID（他のアプリとデータが混ざらないようにするため）
const APP_ID = "financial-quiz-4-3";

// ==========================================
// Question Data
// ==========================================
const questionsData = [
  {
    id: 1,
    title: "問題 1 情報システムの処理形態",
    question: "次の情報処理システムの処理形態に関する説明として、最も不適切なものはどれか。",
    choices: [
      "顧客のスマートフォンから、列車や航空機の座席予約を行えるようにするためには、OLTP（オンライントランザクション処理）が必要である。",
      "全国店舗の現在の売上高・受注高を表示するために必要なのは、リモートバッチ処理である。",
      "店舗の閉店後に、その日の売上データを集計するのに必要なのはバッチ処理である。",
      "工業用ロボットの自動運転システムや、航空管制システムのように、即座の対応が求められるシステムにはリアルタイム制御処理が必要である。"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: イ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <p>本問では情報システムの処理形態について問われています。<br/>情報システムの処理形態を、処理のタイミングや応答速度で分類すると、以下のようになります。</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><span className="font-bold">バッチ処理: </span> 一定期間の処理をまとめて、一括で行います。毎日・毎月というように一定期間ごとに処理が発生するシステムで利用されます。具体例は、月末の売上集計処理や、夜間のデータのバックアップ処理などが挙げられます。また、バッチ処理の一形態であるリモートバッチ処理は、処理するコンピュータにデータを集める際に、通信回線を用いる方式です。</li>
            <li><span className="font-bold">OLTP（オンライントランザクション処理）: </span> 取引の度にリアルタイムで処理が行われます。データの整合性が求められるシステムで利用されます。具体例は、銀行のATM や、ネットでのオンライン販売などが挙げられます。</li>
            <li><span className="font-bold">リアルタイム制御処理: </span> データの処理要求が発生したときに、即座に処理を行い結果を返す方式です。具体例は工業用ロボットの自動運転システムや航空管制システムなどが挙げられます。</li>
          </ul>
          <p className="mt-2">それぞれの方式は処理のタイミングや応答速度が異なりますので、その差を具体的なシステムに当てはめて考えるようになるのがポイントです。</p>
        </div>
        <ul className="space-y-2">
          <li><strong>ア ○: </strong>列車や航空機の座席予約では、複数の顧客の予約が重複しないよう、整合性を保つ必要があります。したがってOLTPが必要になります。記述は適切です。</li>
          <li><strong>イ ×: </strong>売上高や受注高は個々の取引ごとに、整合性を保ちながら記録される必要があります。したがってOLTPが必要になります。全国店舗のデータを集計するには通信回線が必要となりますが、バッチ処理では現在の状態を把握することができません。よって、記述は不適切です。</li>
          <li><strong>ウ ○: </strong>1日分のデータを蓄積した後、夜間に売上を算出しています。したがってバッチ処理が必要になります。記述は適切です。</li>
          <li><strong>エ ○: </strong>即座に処理を行い結果を返す必要があるシステムですので、リアルタイム制御処理が必要になります。よって、記述は適切です。</li>
        </ul>
      </div>
    )
  },
  {
    id: 2,
    title: "問題 2 クライアントサーバシステム",
    question: "3階層クライアントサーバシステムに関する説明として、適切なものはどれか。",
    choices: [
      "ファンクション層では、ユーザからの入力受付機能を提供する。",
      "プレゼンテーション層では、データの加工処理を行う。",
      "プレゼンテーション層、ファンクション層、データベース層は、別々のコンピュータに配置することも、同じコンピュータに配置することも出来る。",
      "ファンクション層とデータベース層は同じコンピュータに配置する必要がある。"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: ウ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <p>本問ではクライアントサーバシステムについて問われています。<br/>情報処理システムの処理形態を、処理の分散で分けると、メインフレームに代表される集中処理と、クライアントサーバシステムに代表される分散処理に分類されます。クライアントサーバシステムには、2階層と3階層のシステムがあります。</p>
          <ul className="list-disc pl-5 mt-2 space-y-2">
            <li><span className="font-bold">2階層システム: </span> サービスを提供するサーバと、サービスを受けるクライアントの2階層で成り立ちます。</li>
            <li><span className="font-bold">3階層システム: </span> ユーザインターフェースを提供するためのプレゼンテーション層（例: クライアント側のWebブラウザ）、データの加工処理を行うファンクション層（もしくはアプリケーション層）（例: 各種アプリケーションサーバ）、データベース層（例: データベースサーバ）の3階層から成り立ちます。</li>
          </ul>
          <p className="mt-2">3階層システムでは、2階層システムでクライアント側のソフトウェアに含まれていた処理（ビジネスロジック）をファンクション層（アプリケーションサーバ）に配置し、クライアントにはユーザインターフェースだけを残しました。それにより、処理が変わったときに、クライアント側のソフトを配置し直す必要がなくなりました。<br/>この3つの階層は論理的な区分であるため、物理的な配置には、さまざまなパターンが存在します。</p>
        </div>
        <ul className="space-y-2">
          <li><strong>ア ×: </strong>ユーザからの入力受付機能を提供するのはプレゼンテーション層です。代表的な例はWebブラウザです。よって、記述は不適切です。</li>
          <li><strong>イ ×: </strong>データの加工処理を行うのはファンクション層です。アプリケーションサーバが代表的な例で、アプリケーション層とも呼ばれます。よって、記述は不適切です。</li>
          <li><strong>ウ ○: </strong>3階層システムにおけるプレゼンテーション層、ファンクション層、データベース層は論理的な区分であるため、物理的な配置には制約はありません。1台のコンピュータに配置することも、別々のコンピュータに配置することも可能です。よって、記述は適切です。</li>
          <li><strong>エ ×: </strong>ウの解説の通り、3つの階層は論理的な区分であるため、物理的な配置には制限はありません。よって、記述は不適切です。</li>
        </ul>
      </div>
    )
  },
  {
    id: 3,
    title: "問題 3 ネットワークの負荷分散システム",
    question: "ネットワークの負荷分散システムに関する記述として、最も適切なものはどれか。",
    choices: [
      "ロードバランサの負荷分散方式の１つであるアダプティブ方式とは、事前に設定された割り当て比率に応じて、クライアントからのリクエストを振り分ける方式のことである。",
      "ロードバランサの負荷分散方式の１つであるラウンドロビン方式は、応答時間が短いサーバにリクエストを振り分ける比率を多くする方式である。",
      "ロードバランサは、外部から送られてくるデータや処理要求を、複数のサーバに振り分け、一台あたりの負荷を抑える装置である。",
      "ロードバランサとは、複数のプロバイダと契約し、インターネット回線の冗長化を行う際に用いられる装置である。"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: ウ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <p>本問では負荷分散システムで使われる装置である、ロードバランサについて問われています。</p>
          <p>ロードバランサは、外部から送られてくるデータや処理要求を、複数のサーバに振り分け、一台あたりの負荷を抑える装置です。また、一部のサーバで障害が発生した場合に、そのサーバを切り離し、正常に動作している他のサーバのみに振り分けることで、システムの稼働を継続することができます。</p>
          <p>ロードバランサの負荷分散方式には、ラウンドロビン、重み付けラウンドロビン、最速応答時間、最小接続数、アダプティブ方式などがあります。</p>
        </div>
        <ul className="space-y-2">
          <li><strong>ア ×: </strong>アダプティブ方式とは、サーバの変化や状況に合わせて振り分ける方式です。サーバ応答時間、サーバへのコネクション数、サーバ統計値をトータル的に組み合わせて、負荷を分散します。</li>
          <li><strong>イ ×: </strong>ラウンドロビン方式とは、クライアントからのリクエストをサーバに均等に振り分ける方式です。</li>
          <li><strong>ウ ○: </strong>この記述はロードバランサの記述になります。よって、正解となります。</li>
          <li><strong>エ ×: </strong>複数のプロバイダと契約し、インターネット回線の冗長化を行う際に用いられる装置は、マルチホーミングです。</li>
        </ul>
      </div>
    )
  },
  {
    id: 4,
    title: "問題 4 情報システムの性能1",
    question: "情報システムの性能に関する次の文中の空欄A～Dに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\nシステムに何らかの処理要求を送り終えてから、始めの結果が返ってくるまでの応答時間のことを（ A ）という。一方、処理要求の入力を開始してから、全ての処理結果が出力されるまでの時間のことを（ B ）という。\n単位時間あたりに実行される処理件数を（ C ）という。例えば、1時間あたりに実行されるトランザクション数などが（ C ）に当たる。\nベンチマークテストで処理速度を測定する単位の一つである（ D ）は、1秒間に実行できる浮動小数点演算の数を表したものである。",
    choices: [
      "A: レスポンスタイム B: ターンアラウンドタイム C: オーバーヘッド D: FLOPS",
      "A: レスポンスタイム B: ターンアラウンドタイム C: スループット D: FLOPS",
      "A: ターンアラウンドタイム B: レスポンスタイム C: オーバーヘッド D: MIPS",
      "A: ターンアラウンドタイム B: レスポンスタイム C: スループット D: MIPS"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: イ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <p>レスポンスタイムは、処理要求を送ってから、始めの結果が返ってくるまでの応答時間です。ターンアラウンドタイムは、処理要求の入力を開始してから、全ての処理結果が出力されるまでの時間です。</p>
          <div className="my-4 p-4 bg-white border border-gray-300 rounded text-center">
            <p className="font-bold mb-2">【性能のタイムライン】</p>
            <div className="flex flex-col items-center">
              <div className="flex w-full max-w-md justify-between text-xs text-blue-600 mb-1">
                <span>入力開始▼</span>
                <span>要求開始▼</span>
                <span className="text-red-600">表示開始▼</span>
                <span className="text-red-600">表示終了▼</span>
              </div>
              <div className="flex w-full max-w-md border border-gray-400 h-10 shadow-sm">
                <div className="flex-1 bg-cyan-100 flex items-center justify-center border-r border-gray-400">入力</div>
                <div className="flex-[2] bg-yellow-100 flex items-center justify-center border-r border-gray-400">処理</div>
                <div className="flex-[1.5] bg-orange-100 flex items-center justify-center">表示</div>
              </div>
              <div className="w-full max-w-md mt-2 relative h-12 text-xs">
                {/* レスポンスタイム */}
                <div className="absolute top-0 left-[25%] right-[40%] border-t border-dashed border-gray-800 flex justify-center mt-1">
                   <span className="bg-white px-2 -mt-2 text-red-600 font-bold">レスポンスタイム</span>
                </div>
                <div className="absolute top-0 left-[25%] h-2 border-l border-dashed border-gray-800"></div>
                <div className="absolute top-0 right-[40%] h-2 border-r border-dashed border-gray-800"></div>
                {/* ターンアラウンドタイム */}
                <div className="absolute top-6 left-0 right-0 border-t border-dashed border-gray-800 flex justify-center mt-1">
                   <span className="bg-white px-2 -mt-2 text-red-600 font-bold">ターンアラウンドタイム</span>
                </div>
                <div className="absolute top-6 left-0 h-2 border-l border-dashed border-gray-800"></div>
                <div className="absolute top-6 right-0 h-2 border-r border-dashed border-gray-800"></div>
              </div>
            </div>
          </div>
          <p>次にスループットは、単位時間あたりに実行される処理件数を表します。この値は大きい方が性能が高くなります。</p>
          <p>ベンチマークテストでは、処理速度を測定する単位としてFLOPSやMIPSを使用します。<br/>FLOPSは1秒間に実行できる浮動小数点演算の数、MIPSは1秒間に実行できる命令数を100万単位で表したものです。</p>
        </div>
        <ul className="space-y-2">
          <li><strong>A: レスポンスタイム、B: ターンアラウンドタイム</strong><br/>レスポンスタイムとターンアラウンドタイムは混乱しやすく、試験でも一緒に出題されることが多いため、違いを正確に覚えておきましょう。</li>
          <li><strong>C: スループット</strong><br/>スループットは、単位時間あたりに実行される処理件数です。</li>
          <li><strong>D: FLOPS</strong><br/>FLOPS（Floating point number Operations Per Second）は浮動小数点演算の数です。</li>
        </ul>
      </div>
    )
  },
  {
    id: 5,
    title: "問題 5 情報システムの性能2",
    question: "情報システムの性能に関する説明として、最も不適切なものはどれか。",
    choices: [
      "ある処理を行うために、間接的・付加的に必要となる処理やシステムリソースのことをオーバーヘッドという。",
      "1台のコンピュータで同時に複数の処理を並行して行う機能のことをマルチタスクという。マルチタスクでは、例えば、同時に複数のアプリケーションを実行することができる。",
      "サイクルタイムとは、繰り返される一連の作業プロセスにおいて、その一周期にかかる時間のことである。",
      "CPUが記憶装置にデータを書き込み、読み出しを行うのに必要な時間のことをレスポンスタイムという。"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: エ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><span className="font-bold">オーバーヘッド: </span> ある処理を行うときに必要となる、コンピュータシステム全体に関わる制御や管理などの間接的・追加的な処理（および消費されるリソース）のこと。</li>
            <li><span className="font-bold">サイクルタイム: </span> 繰り返される一連の作業プロセスの一周期にかかる時間。</li>
            <li><span className="font-bold">アクセスタイム: </span> CPUが記憶装置にデータを書き込み、読み出しを行なうのに必要な時間。</li>
            <li><span className="font-bold">マルチタスク: </span> 同時に複数の処理を行う機能（複数のアプリを並列実行）。</li>
            <li><span className="font-bold">マルチスレッド: </span> 同時に複数のスレッド（処理単位）を起動して並列的に実行できること。</li>
          </ul>
        </div>
        <ul className="space-y-2">
          <li><strong>ア ○: </strong>オーバーヘッドは間接的・追加的な処理を指します。</li>
          <li><strong>イ ○: </strong>この記述はマルチタスクのことを示しており適切です。</li>
          <li><strong>ウ ○: </strong>この記述はサイクルタイムのことを示しており適切です。</li>
          <li><strong>エ ×: </strong>この記述はアクセスタイムのことを示しており不適切です。レスポンスタイムは、処理要求を送ってから始めの結果が返ってくるまでの応答時間のことです。</li>
        </ul>
      </div>
    )
  },
  {
    id: 6,
    title: "問題 6 情報システムの性能3",
    question: "通信品質の指標に関する記述として、最も適切なものはどれか。",
    choices: [
      "レイテンシとは、単位時間あたりに実行される処理件数のことである。",
      "レイテンシが小さいと、データの送信と到着に時間がかかるため、スループットが低下する可能性がある。",
      "ジッタとは、デジタル信号の品質を示す指標のひとつで、信号を伝送する際に生じる時間軸方向のズレや揺らぎのことである。",
      "ジッタが大きい環境でPing値を連続で測定すると、Ping値の最大値と最小値の差は小さくなる。"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: ウ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <p>転送要求を出してから実際にデータが送られてくるまでに生じる通信の遅延時間のことを、<strong>レイテンシ</strong>と言います。遅延時間が短いことをレイテンシが小さい、長いことを大きいと表現します。</p>
          <p>音声や映像の乱れを生じさせる原因となるもののひとつに、<strong>ジッタ</strong>があります。ジッタとは、デジタル信号の品質を示す指標のひとつで、信号を伝送する際に生じる時間軸方向のズレや揺らぎです。</p>
        </div>
        <ul className="space-y-2">
          <li><strong>ア ×: </strong>単位時間あたりに実行される処理件数とは、スループットのことです。</li>
          <li><strong>イ ×: </strong>レイテンシが「大きい」と、データの送信と到着に時間がかかるため、スループットが低下する可能性があります。</li>
          <li><strong>ウ ○: </strong>この記述はジッタの記述になり正解です。</li>
          <li><strong>エ ×: </strong>ジッタとはPing値の最大値と最小値の差の「揺らぎ」です。ジッタが大きいとは、Ping値の最大値と最小値の差が大きくなることを意味します。</li>
        </ul>
      </div>
    )
  },
  {
    id: 7,
    title: "問題 7 情報システムの信頼性",
    question: "情報システムの信頼性に関する説明として、最も不適切なものはどれか。",
    choices: [
      "信頼性は平均故障間隔（MTBF）という指標で評価される。MTBFは故障を修理して回復してから、次の故障が発生するまでの平均時間を表す。",
      "保守性は平均修理時間（MTTR）という指標で評価される。MTTRは故障が発生した場合に、修理にかかる平均時間を表す。",
      "可用性は稼働率という指標で評価される。稼働率はシステムの運用時間に占める、稼働時間の割合を表す。",
      "フェールセーフとは、故障が発生した際に、処理を中断することなく機能を維持するシステム構成を表す。"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: エ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要 (RASについて)</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Reliability（信頼性）: </strong> 「故障しない」ことを表す。指標はMTBF（平均故障間隔）。</li>
            <li><strong>Availability（可用性）: </strong> 「常にシステムが利用できる」ことを表す。指標は稼働率。</li>
            <li><strong>Serviceability（保守性）: </strong> 故障したときに「早く回復できる」ことを表す。指標はMTTR（平均修理時間）。</li>
          </ul>
          <p className="font-bold mt-4 mb-2">信頼性に関する用語</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>フェールセーフ (Fail safe): </strong> 故障時にシステムを安全な方向に動作させる設計概念。</li>
            <li><strong>フェールソフト (Fail soft): </strong> 故障時に処理を中断することなく機能を維持する（縮退運転する）システム構成方法。</li>
            <li><strong>フォールトトレラント: </strong> 一部が故障しても正常に処理を続行できること。</li>
          </ul>
        </div>
        <ul className="space-y-2">
          <li><strong>ア ○: </strong>信頼性はMTBFで評価されます（MTBF＝稼働時間の合計÷故障回数）。</li>
          <li><strong>イ ○: </strong>保守性はMTTRで評価されます（MTTR＝修理時間の合計÷故障回数）。</li>
          <li><strong>ウ ○: </strong>可用性は稼働率で評価されます（稼働率＝稼働時間の合計÷運用時間）。</li>
          <li><strong>エ ×: </strong>この記述はフェールソフトのものです。フェールセーフは、ストーブが転倒した場合に自動的に消火するような安全優先の設計概念です。</li>
        </ul>
      </div>
    )
  },
  {
    id: 8,
    title: "問題 8 信頼性の計算",
    question: "あるシステムの運用経過において、稼働時間が「120時間」「100時間」「140時間」、その間の修理時間が「3時間」「4時間」「2時間」であった。このシステムの平均故障間隔（MTBF）について最も適切なものを選べ。",
    choices: [
      "120時間",
      "123時間",
      "128時間",
      "130時間"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: ア</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <p>MTBF（平均故障間隔）は、次の式で求めます。</p>
          <p className="font-mono bg-white p-2 text-center rounded border border-gray-300">MTBF ＝ 稼働時間の合計 ÷ 故障回数</p>
        </div>
        <div>
          <p className="font-bold">解説</p>
          <p>稼働時間は120時間、100時間、140時間で合計360時間です。故障は全部で3回発生しています。</p>
          <p>MTBF ＝ 360時間 ÷ 3回 ＝ 120時間</p>
          <p>※修理時間の長さは、MTBFの計算上は関係ありません。</p>
        </div>
      </div>
    )
  },
  {
    id: 9,
    title: "問題 9 可用性の計算",
    question: "あるシステムの運用経過において、稼働時間が「120時間」「100時間」「140時間」、その間の修理時間が「12時間」「18時間」「10時間」であった。このシステムの稼働率について最も適切なものを選べ。",
    choices: [
      "75%",
      "80%",
      "85%",
      "90%"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: エ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <p>稼働率は、次の式で求めます。</p>
          <p className="font-mono bg-white p-2 text-center rounded border border-gray-300 mb-2">稼働率 ＝ 稼働時間の合計 ÷ 運用時間</p>
          <p>または</p>
          <p className="font-mono bg-white p-2 text-center rounded border border-gray-300">稼働率 ＝ MTBF ÷ （MTBF ＋ MTTR）</p>
        </div>
        <div>
          <p className="font-bold">解説</p>
          <p>稼働時間は、120＋100＋140＝360時間。</p>
          <p>故障（修理）時間は、12＋18＋10＝40時間。</p>
          <p>運用時間は全ての合計で 360＋40＝400時間。</p>
          <p>稼働率 ＝ 360時間 ÷ 400時間 ＝ 0.90 ＝ 90％</p>
        </div>
      </div>
    )
  },
  {
    id: 10,
    title: "問題 10 保守性の計算",
    question: "あるシステムの運用経過において、稼働時間が「120時間」「100時間」「140時間」、その間の修理時間が「3時間」「4時間」「2時間」であった。このシステムの平均修理時間（MTTR）について最も適切なものを選べ。",
    choices: [
      "1.5時間",
      "2時間",
      "3時間",
      "6時間"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: ウ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <p>MTTR（平均修理時間）は、次の式で求めます。</p>
          <p className="font-mono bg-white p-2 text-center rounded border border-gray-300">MTTR ＝ 修理時間の合計 ÷ 故障回数</p>
        </div>
        <div>
          <p className="font-bold">解説</p>
          <p>故障（修理）時間は3時間、4時間、2時間で合計9時間です。故障は全部で3回発生しています。</p>
          <p>MTTR ＝ 9時間 ÷ 3回 ＝ 3時間</p>
          <p>※稼働時間の長さは、MTTRの計算上は関係ありません。</p>
        </div>
      </div>
    )
  },
  {
    id: 11,
    title: "問題 11 直列方式と並列方式の稼働率計算",
    question: "稼働率が90%のメインサーバと、稼働率が80%のサブサーバがある。この2台のサーバを並列に接続した場合と、直列で接続した場合のそれぞれにおけるシステム全体の稼働率について適切なものを選べ。",
    choices: [
      "並列方式 72%、直列方式 72%",
      "並列方式 72%、直列方式 98%",
      "並列方式 85%、直列方式 80%",
      "並列方式 98%、直列方式 72%",
      "並列方式 98%、直列方式 80%"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: エ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <p><strong>並列方式: </strong> 個々の装置が1つでも稼動していればシステム全体として稼動します。</p>
          <p className="font-mono bg-white p-2 text-center rounded border border-gray-300 mb-2">稼働率 ＝ 1 － （1 － Aの稼働率） × （1 － Bの稼働率）</p>
          <p><strong>直列方式: </strong> 全ての装置が稼動していることが条件です。</p>
          <p className="font-mono bg-white p-2 text-center rounded border border-gray-300">稼働率 ＝ Aの稼働率 × Bの稼働率</p>
        </div>
        <div>
          <p className="font-bold">解説</p>
          <p>並列接続の稼働率 ＝ 1 － (1 - 0.90) × (1 - 0.80) ＝ 1 - (0.10 × 0.20) ＝ 1 - 0.02 ＝ 0.98 (98%)</p>
          <p>直列接続の稼働率 ＝ 0.90 × 0.80 ＝ 0.72 (72%)</p>
        </div>
      </div>
    )
  },
  {
    id: 12,
    title: "問題 12 情報システムの高信頼化へのアプローチ",
    question: "情報システムの信頼性を高めるアプローチに関する次の文中の空欄A～Dに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\n故障や障害が発生しないよう対処する取り組みを、Aという。情報システムは故障しないことが理想であるが、実際にはどうしても故障は発生する。そのため、あらかじめ故障を想定して情報システムを設計することが重要となる。\nこのような高信頼化へのアプローチには、故障や障害が発生したときも主な機能の動作が続行できるように設計するB、故障や障害が発生した場合、システムの被害を最小限にとどめる動作をさせるCなどがある。また、故障が発生した際に、処理を中断することなく機能を維持するシステム構成方法をDという。",
    choices: [
      "A: フォールトアボイダンス B: フェールセーフ C: フェールソフト D: フォールトトレランス",
      "A: フォールトアボイダンス B: フォールトトレランス C: フェールセーフ D: フェールソフト",
      "A: フェールセーフ B: フォールトアボイダンス C: フォールトトレランス D: フェールソフト",
      "A: フェールセーフ B: フォールトトレランス C: フェールソフト D: フォールトアボイダンス"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: イ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>フォールトアボイダンス: </strong> 故障や障害が発生しないよう対処する（回避する）取り組み。</li>
            <li><strong>フェールセーフ: </strong> 故障時にシステムを安全な方向に動作させる設計概念（例: 列車に急ブレーキ）。</li>
            <li><strong>フェールソフト: </strong> 故障時に処理を中断することなく機能（縮退運転）を維持する構成（例: 双発機の片肺飛行）。</li>
            <li><strong>フォールトトレランス: </strong> 構成部品の一部が故障しても正常に処理を続行できるように設計すること（機能を低下させない）。</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 13,
    title: "問題 13 システムとデータの保護1",
    question: "業務に必要となるシステムやデータを保護するための機能がある。空欄A～Dに入る語句の組み合わせとして最も適切なものを選べ。\n（ A ）バックアップは、前回フルバックアップからの差分だけをバックアップする。\n（ B ）バックアップは、直前のバックアップとの差分だけをバックアップする。\n（ C ）は、ハードディスクを2重に持つ構成である。これにより一方が故障しても業務を継続できる。\n（ D ）は、2つのシステムを用意し、片方で運用を行う。もう片方は待機しておき、障害発生時に切り替えて運用する。",
    choices: [
      "A: 増分 B: 差分 C: ミラーリング D: デュアルシステム",
      "A: 差分 B: 増分 C: ミラーリング D: デュプレックスシステム",
      "A: 差分 B: 増分 C: レプリケーション D: デュプレックスシステム",
      "A: 増分 B: 差分 C: レプリケーション D: デュアルシステム"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: イ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>差分バックアップ (A): </strong> 「前回フルバックアップから」の変更部分をバックアップ。</li>
            <li><strong>増分バックアップ (B): </strong> 「直前のバックアップ（種類問わず）から」の変更部分をバックアップ。</li>
            <li><strong>ミラーリング (C): </strong> ハードディスクを2重に持つ構成。</li>
            <li><strong>デュプレックスシステム (D): </strong> 2つのシステムを用意し、片方を待機（スタンバイ）させておく構成。</li>
            <li><strong>デュアルシステム: </strong> 2つのシステムで「同時に同じ処理」を行い、結果を照合しながら稼働する構成。</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 14,
    title: "問題 14 システムとデータの保護2",
    question: "システムやデータを保護する機能の説明として、最も不適切なものはどれか。",
    choices: [
      "UPS（無停電電源装置）とは、停電などで電源供給が停止した場合でも、一定時間、電力を供給する装置である。",
      "クラスタリングとは、独立して動作する物理的に複数のコンピュータを相互に接続し、全体として信頼性の高い、論理的に1台のコンピュータシステムを構築する形態である。",
      "フェールセーフとは、故障が発生した際に、処理を中断することなく機能を維持するシステム構成方法である。",
      "RAIDとは複数のハードディスクを構成することにより、ハードディスクの性能や信頼性を向上する技術である。"
    ],
    correctIndex: 2,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: ウ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">解説</p>
          <ul className="space-y-2">
            <li><strong>ア ○: </strong>UPSについて適切に記述されています。サーバを安全にシャットダウンする時間を稼ぎます。</li>
            <li><strong>イ ○: </strong>クラスタリングについて適切に記述されています。一部のコンピュータが障害を起こしても他のコンピュータが肩代わりします。</li>
            <li><strong>ウ ×: </strong>「処理を中断することなく機能を維持する」のは<strong>フェールソフト</strong>です。フェールセーフは安全な方向へシステムを制御する（安全に停止させる等）概念です。</li>
            <li><strong>エ ○: </strong>RAID（Redundant Array of Inexpensive Disk）についての適切な説明です。</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 15,
    title: "問題 15 通信速度",
    question: "2台の端末がスイッチングハブにツイストペアケーブルで接続されている。この2台の端末間では、100MBのファイル転送を1分以内に終わらせたい。2台の端末およびスイッチングハブに必要な規格として、最も適切なものはどれか。",
    choices: [
      "10BASE-T",
      "100BASE-TX",
      "100BASE-FX",
      "1000BASE-LX"
    ],
    correctIndex: 1,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: イ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">解説</p>
          <p>ファイルサイズ: 100MB ＝ 100 × 1024 × 1024 Byte</p>
          <p>これをビット（bit）に直すため 8 を掛けます。<br/>100MB ＝ 100 × 1024 × 1024 × 8 ＝ 838,860,800 bit</p>
          <p>1分（60秒）で送るための速度: <br/>838,860,800 ÷ 60秒 ≒ 13,981,013 bps （約14Mbps）</p>
          <p>選択肢の中で約14Mbps以上出せるのは 100Mbps の規格です。</p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>10BASE-T: </strong> 10Mbps (遅い)</li>
            <li><strong>100BASE-TX: </strong> 100Mbps、ツイストペア（銅線）ケーブル対応。<strong>正解</strong></li>
            <li><strong>100BASE-FX: </strong> 100Mbps、光ファイバケーブル。</li>
            <li><strong>1000BASE-LX: </strong> 1Gbps、光ファイバケーブル。</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 16,
    title: "問題 16 データ送信時間",
    question: "通信速度64kbpsの専用線で接続された端末間で、1MBのファイルを転送するとき、このデータの送受信にかかるおおよその時間について最も適切なものを選べ。ただし、計算には制御情報などのオーバーヘッドは含めず、回線速度とファイルサイズのみから算出すること。",
    choices: [
      "16秒",
      "32秒",
      "64秒",
      "131秒"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: エ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">解説</p>
          <p>単位を合わせて計算します。ファイルサイズ(Byte)はビット(bit)に変換します。</p>
          <p>1MB ＝ 1024 × 1024 × 8 bit ＝ 8,388,608 bit</p>
          <p>通信速度（kbpsの「k」は1000）<br/>64kbps ＝ 64,000 bps</p>
          <p>転送時間 ＝ 8,388,608 ÷ 64,000 ≒ 131.07 秒</p>
          <p className="mt-2 text-xs text-gray-500">※概算として 1MB ≒ 1,000,000 Byte × 8 ＝ 8,000,000 bit。<br/>8,000,000 ÷ 64,000 ＝ 125秒と計算しても、選択肢からエ（131秒）を選ぶことができます。</p>
        </div>
      </div>
    )
  },
  {
    id: 17,
    title: "問題 17 LAN接続機器",
    question: "LAN接続に利用される機器の役割について、次の文中の空欄A～Dに入る語句の組み合わせとして最も適切なものを選べ。\n（ A ）は、この機器に届いたデータを他の全てのポートに転送する。OSI参照モデルでは、物理層に属する。\n（ B ）は、OSI参照モデルにおけるデータリンク層に属する機器で、宛先MACアドレスに基づいて、宛先となるポートだけにデータを転送する。\n（ C ）は、OSI参照モデルにおけるネットワーク層に属する機器で、LANとWANなど、異なるネットワークを接続する。\n（ D ）は、コンピュータやプリンタをネットワークに接続するNICに割り当てられており、同一セグメント内のLAN通信に利用される。",
    choices: [
      "A: リピータハブ B: スイッチングハブ C: ルータ D: MACアドレス",
      "A: スイッチングハブ B: リピータハブ C: ルータ D: MACアドレス",
      "A: ルータ B: スイッチングハブ C: MACアドレス D: リピータハブ",
      "A: リピータハブ B: MACアドレス C: スイッチングハブ D: ルータ"
    ],
    correctIndex: 0,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: ア</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">ここが重要</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>リピータハブ (A): </strong> 受け取ったデータを電気的に他の全ポートに転送する（物理層）。衝突が起きやすい。</li>
            <li><strong>スイッチングハブ (B): </strong> 宛先MACアドレスを読み取って、該当するポートにだけ転送する（データリンク層）。</li>
            <li><strong>ルータ (C): </strong> 異なるネットワーク（LANとWANなど）を接続する。IPアドレスを元に経路選択（ルーティング）を行う（ネットワーク層）。</li>
            <li><strong>MACアドレス (D): </strong> NIC（ネットワークインターフェースカード）に割り当てられた物理的な住所。</li>
          </ul>
        </div>
      </div>
    )
  },
  {
    id: 18,
    title: "問題 18 LAN",
    question: "「無線LAN内蔵のPC-A」と「100Mbps有線LANのPC-B」、および「有線プリンタ」が、無線LAN対応・100Mbps対応のブロードバンドルータ（IPマスカレード有効）に接続されている1つのセグメントからなるLANがある。このLANに関する記述として最も適切なものはどれか。",
    choices: [
      "PC-A（無線LAN）とPC-B（有線LAN）の間はデータ通信することができない。",
      "インターネットに接続したいPCには、グローバルIPアドレスを割り当てる必要がある。",
      "PC-A（無線LAN）からLAN対応プリンタを利用する場合、PC-Aは有線LANに接続しなおす必要がある。",
      "PC-Aとブロードバンドルータ間の接続がIEEE802.11b（通信速度11Mbps）で接続されている場合、PC-AとPC-B間の通信速度は、最大で11Mbpsとなる。"
    ],
    correctIndex: 3,
    explanation: (
      <div className="space-y-4 text-sm text-gray-700">
        <p className="font-bold text-lg text-red-600">解答: エ</p>
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-bold border-b border-blue-200 pb-2 mb-2">解説</p>
          <ul className