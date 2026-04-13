// npm install lucide-react recharts firebase
import React, { useState, useEffect, useMemo } from 'react';
import { Check, X, Home, ChevronRight, List, AlertCircle, RefreshCw, LogOut, CheckSquare, Square } from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

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

解答：イ

ここが重要
本問では情報システムの処理形態について問われています。情報システムの処理形態を、処理のタイミングや応答速度で分類すると、以下のようになります。

バッチ処理: 一定期間の処理をまとめて、一括で行います。毎日・毎月というように一定期間ごとに処理が発生するシステムで利用されます。具体例は、月末の売上集計処理や、夜間のデータのバックアップ処理などが挙げられます。また、バッチ処理の一形態であるリモートバッチ処理は、処理するコンピュータにデータを集める際に、通信回線を用いる方式です。
OLTP（オンライントランザクション処理）: 取引の度にリアルタイムで処理が行われます。データの整合性が求められるシステムで利用されます。具体例は、銀行のATM や、ネットでのオンライン販売などが挙げられます。
リアルタイム制御処理: データの処理要求が発生したときに、即座に処理を行い結果を返す方式です。具体例は工業用ロボットの自動運転システムや航空管制システムなどが挙げられます。

それぞれの方式は処理のタイミングや応答速度が異なりますので、その差を具体的なシステムに当てはめて考えるようになるのがポイントです。


ア ○：列車や航空機の座席予約では、複数の顧客の予約が重複しないよう、整合性を保つ必要があります。したがってOLTPが必要になります。記述は適切です。
イ ×：売上高や受注高は個々の取引ごとに、整合性を保ちながら記録される必要があります。したがってOLTPが必要になります。全国店舗のデータを集計するには通信回線が必要となりますが、バッチ処理では現在の状態を把握することができません。よって、記述は不適切です。
ウ ○：1日分のデータを蓄積した後、夜間に売上を算出しています。したがってバッチ処理が必要になります。記述は適切です。
エ ○：即座に処理を行い結果を返す必要があるシステムですので、リアルタイム制御処理が必要になります。よって、記述は適切です。


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

解答：ウ

ここが重要
本問ではクライアントサーバシステムについて問われています。情報処理システムの処理形態を、処理の分散で分けると、メインフレームに代表される集中処理と、クライアントサーバシステムに代表される分散処理に分類されます。クライアントサーバシステムには、2階層と3階層のシステムがあります。

2階層システム: サービスを提供するサーバと、サービスを受けるクライアントの2階層で成り立ちます。
3階層システム: ユーザインターフェースを提供するためのプレゼンテーション層（例：クライアント側のWebブラウザ）、データの加工処理を行うファンクション層（もしくはアプリケーション層）（例：各種アプリケーションサーバ）、データベース層（例：データベースサーバ）の3階層から成り立ちます。

3階層システムでは、2階層システムでクライアント側のソフトウェアに含まれていた処理（ビジネスロジック）をファンクション層（アプリケーションサーバ）に配置し、クライアントにはユーザインターフェースだけを残しました。それにより、処理が変わったときに、クライアント側のソフトを配置し直す必要がなくなりました。この3つの階層は論理的な区分であるため、物理的な配置には、さまざまなパターンが存在します。


ア ×：ユーザからの入力受付機能を提供するのはプレゼンテーション層です。代表的な例はWebブラウザです。よって、記述は不適切です。
イ ×：データの加工処理を行うのはファンクション層です。アプリケーションサーバが代表的な例で、アプリケーション層とも呼ばれます。よって、記述は不適切です。
ウ ○：3階層システムにおけるプレゼンテーション層、ファンクション層、データベース層は論理的な区分であるため、物理的な配置には制約はありません。1台のコンピュータに配置することも、別々のコンピュータに配置することも可能です。よって、記述は適切です。
エ ×：ウの解説の通り、3つの階層は論理的な区分であるため、物理的な配置には制限はありません。よって、記述は不適切です。


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

解答：ウ

ここが重要
本問では負荷分散システムで使われる装置である、ロードバランサについて問われています。
ロードバランサは、外部から送られてくるデータや処理要求を、複数のサーバに振り分け、一台あたりの負荷を抑える装置です。また、一部のサーバで障害が発生した場合に、そのサーバを切り離し、正常に動作している他のサーバのみに振り分けることで、システムの稼働を継続することができます。
ロードバランサの負荷分散方式には、ラウンドロビン、重み付けラウンドロビン、最速応答時間、最小接続数、アダプティブ方式などがあります。


ア ×：アダプティブ方式とは、サーバの変化や状況に合わせて振り分ける方式です。サーバ応答時間、サーバへのコネクション数、サーバ統計値をトータル的に組み合わせて、負荷を分散します。
イ ×：ラウンドロビン方式とは、クライアントからのリクエストをサーバに均等に振り分ける方式です。
ウ ○：この記述はロードバランサの記述になります。よって、正解となります。
エ ×：複数のプロバイダと契約し、インターネット回線の冗長化を行う際に用いられる装置は、マルチホーミングです。


)
},
{
id: 4,
title: "問題 4 情報システムの性能1",
question: "情報システムの性能に関する次の文中の空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\nシステムに何らかの処理要求を送り終えてから、始めの結果が返ってくるまでの応答時間のことを（ Ａ ）という。一方、処理要求の入力を開始してから、全ての処理結果が出力されるまでの時間のことを（ Ｂ ）という。\n単位時間あたりに実行される処理件数を（ Ｃ ）という。例えば、1時間あたりに実行されるトランザクション数などが（ Ｃ ）に当たる。\nベンチマークテストで処理速度を測定する単位の一つである（ Ｄ ）は、1秒間に実行できる浮動小数点演算の数を表したものである。",
choices: [
"Ａ：レスポンスタイム　Ｂ：ターンアラウンドタイム Ｃ：オーバーヘッド　Ｄ：FLOPS",
"Ａ：レスポンスタイム　Ｂ：ターンアラウンドタイム Ｃ：スループット　Ｄ：FLOPS",
"Ａ：ターンアラウンドタイム　Ｂ：レスポンスタイム Ｃ：オーバーヘッド　Ｄ：MIPS",
"Ａ：ターンアラウンドタイム　Ｂ：レスポンスタイム Ｃ：スループット　Ｄ：MIPS"
],
correctIndex: 1,
explanation: (

解答：イ

ここが重要
レスポンスタイムは、処理要求を送ってから、始めの結果が返ってくるまでの応答時間です。ターンアラウンドタイムは、処理要求の入力を開始してから、全ての処理結果が出力されるまでの時間です。

【性能のタイムライン】


入力開始▼
要求開始▼
表示開始▼
表示終了▼


入力
処理
表示


{/* レスポンスタイム /}

レスポンスタイム



{/ ターンアラウンドタイム */}

ターンアラウンドタイム






次にスループットは、単位時間あたりに実行される処理件数を表します。この値は大きい方が性能が高くなります。
ベンチマークテストでは、処理速度を測定する単位としてFLOPSやMIPSを使用します。FLOPSは1秒間に実行できる浮動小数点演算の数、MIPSは1秒間に実行できる命令数を100万単位で表したものです。


Ａ：レスポンスタイム、Ｂ：ターンアラウンドタイムレスポンスタイムとターンアラウンドタイムは混乱しやすく、試験でも一緒に出題されることが多いため、違いを正確に覚えておきましょう。
Ｃ：スループットスループットは、単位時間あたりに実行される処理件数です。
Ｄ：FLOPSFLOPS（Floating point number Operations Per Second）は浮動小数点演算の数です。


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

解答：エ

ここが重要

オーバーヘッド: ある処理を行うときに必要となる、コンピュータシステム全体に関わる制御や管理などの間接的・追加的な処理（および消費されるリソース）のこと。
サイクルタイム: 繰り返される一連の作業プロセスの一周期にかかる時間。
アクセスタイム: CPUが記憶装置にデータを書き込み、読み出しを行なうのに必要な時間。
マルチタスク: 同時に複数の処理を行う機能（複数のアプリを並列実行）。
マルチスレッド: 同時に複数のスレッド（処理単位）を起動して並列的に実行できること。



ア ○：オーバーヘッドは間接的・追加的な処理を指します。
イ ○：この記述はマルチタスクのことを示しており適切です。
ウ ○：この記述はサイクルタイムのことを示しており適切です。
エ ×：この記述はアクセスタイムのことを示しており不適切です。レスポンスタイムは、処理要求を送ってから始めの結果が返ってくるまでの応答時間のことです。


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

解答：ウ

ここが重要
転送要求を出してから実際にデータが送られてくるまでに生じる通信の遅延時間のことを、レイテンシと言います。遅延時間が短いことをレイテンシが小さい、長いことを大きいと表現します。
音声や映像の乱れを生じさせる原因となるもののひとつに、ジッタがあります。ジッタとは、デジタル信号の品質を示す指標のひとつで、信号を伝送する際に生じる時間軸方向のズレや揺らぎです。


ア ×：単位時間あたりに実行される処理件数とは、スループットのことです。
イ ×：レイテンシが「大きい」と、データの送信と到着に時間がかかるため、スループットが低下する可能性があります。
ウ ○：この記述はジッタの記述になり正解です。
エ ×：ジッタとはPing値の最大値と最小値の差の「揺らぎ」です。ジッタが大きいとは、Ping値の最大値と最小値の差が大きくなることを意味します。


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

解答：エ

ここが重要 (RASについて)

Reliability（信頼性）: 「故障しない」ことを表す。指標はMTBF（平均故障間隔）。
Availability（可用性）: 「常にシステムが利用できる」ことを表す。指標は稼働率。
Serviceability（保守性）: 故障したときに「早く回復できる」ことを表す。指標はMTTR（平均修理時間）。

信頼性に関する用語

フェールセーフ (Fail safe): 故障時にシステムを安全な方向に動作させる設計概念。
フェールソフト (Fail soft): 故障時に処理を中断することなく機能を維持する（縮退運転する）システム構成方法。
フォールトトレラント: 一部が故障しても正常に処理を続行できること。



ア ○：信頼性はMTBFで評価されます（MTBF＝稼働時間の合計÷故障回数）。
イ ○：保守性はMTTRで評価されます（MTTR＝修理時間の合計÷故障回数）。
ウ ○：可用性は稼働率で評価されます（稼働率＝稼働時間の合計÷運用時間）。
エ ×：この記述はフェールソフトのものです。フェールセーフは、ストーブが転倒した場合に自動的に消火するような安全優先の設計概念です。


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

解答：ア

ここが重要
MTBF（平均故障間隔）は、次の式で求めます。
MTBF ＝ 稼働時間の合計 ÷ 故障回数


解説
稼働時間は120時間、100時間、140時間で合計360時間です。故障は全部で3回発生しています。
MTBF ＝ 360時間 ÷ 3回 ＝ 120時間
※修理時間の長さは、MTBFの計算上は関係ありません。


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

解答：エ

ここが重要
稼働率は、次の式で求めます。
稼働率 ＝ 稼働時間の合計 ÷ 運用時間
または
稼働率 ＝ MTBF ÷ （MTBF ＋ MTTR）


解説
稼働時間は、120＋100＋140＝360時間。
故障（修理）時間は、12＋18＋10＝40時間。
運用時間は全ての合計で 360＋40＝400時間。
稼働率 ＝ 360時間 ÷ 400時間 ＝ 0.90 ＝ 90％


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

解答：ウ

ここが重要
MTTR（平均修理時間）は、次の式で求めます。
MTTR ＝ 修理時間の合計 ÷ 故障回数


解説
故障（修理）時間は3時間、4時間、2時間で合計9時間です。故障は全部で3回発生しています。
MTTR ＝ 9時間 ÷ 3回 ＝ 3時間
※稼働時間の長さは、MTTRの計算上は関係ありません。


)
},
{
id: 11,
title: "問題 11 直列方式と並列方式の稼働率計算",
question: "稼働率が90%のメインサーバと、稼働率が80%のサブサーバがある。この2台のサーバを並列に接続した場合と、直列で接続した場合のそれぞれにおけるシステム全体の稼働率について適切なものを選べ。",
choices: [
"並列方式　72%、直列方式　72%",
"並列方式　72%、直列方式　98%",
"並列方式　85%、直列方式　80%",
"並列方式　98%、直列方式　72%",
"並列方式　98%、直列方式　80%"
],
correctIndex: 3,
explanation: (

解答：エ

ここが重要
並列方式: 個々の装置が1つでも稼動していればシステム全体として稼動します。
稼働率 ＝ 1 － （1 － Aの稼働率） × （1 － Bの稼働率）
直列方式: 全ての装置が稼動していることが条件です。
稼働率 ＝ Aの稼働率 × Bの稼働率


解説
並列接続の稼働率 ＝ 1 － (1 - 0.90) × (1 - 0.80) ＝ 1 - (0.10 × 0.20) ＝ 1 - 0.02 ＝ 0.98 (98%)
直列接続の稼働率 ＝ 0.90 × 0.80 ＝ 0.72 (72%)


)
},
{
id: 12,
title: "問題 12 情報システムの高信頼化へのアプローチ",
question: "情報システムの信頼性を高めるアプローチに関する次の文中の空欄Ａ～Ｄに入る語句の組み合わせとして、最も適切なものを下記の解答群から選べ。\n故障や障害が発生しないよう対処する取り組みを、Ａという。情報システムは故障しないことが理想であるが、実際にはどうしても故障は発生する。そのため、あらかじめ故障を想定して情報システムを設計することが重要となる。\nこのような高信頼化へのアプローチには、故障や障害が発生したときも主な機能の動作が続行できるように設計するＢ、故障や障害が発生した場合、システムの被害を最小限にとどめる動作をさせるＣなどがある。また、故障が発生した際に、処理を中断することなく機能を維持するシステム構成方法をＤという。",
choices: [
"Ａ：フォールトアボイダンス　Ｂ：フェールセーフ　Ｃ：フェールソフト　Ｄ：フォールトトレランス",
"Ａ：フォールトアボイダンス　Ｂ：フォールトトレランス　Ｃ：フェールセーフ　Ｄ：フェールソフト",
"Ａ：フェールセーフ　Ｂ：フォールトアボイダンス　Ｃ：フォールトトレランス　Ｄ：フェールソフト",
"Ａ：フェールセーフ　Ｂ：フォールトトレランス　Ｃ：フェールソフト　Ｄ：フォールトアボイダンス"
],
correctIndex: 1,
explanation: (

解答：イ

ここが重要

フォールトアボイダンス: 故障や障害が発生しないよう対処する（回避する）取り組み。
フェールセーフ: 故障時にシステムを安全な方向に動作させる設計概念（例：列車に急ブレーキ）。
フェールソフト: 故障時に処理を中断することなく機能（縮退運転）を維持する構成（例：双発機の片肺飛行）。
フォールトトレランス: 構成部品の一部が故障しても正常に処理を続行できるように設計すること（機能を低下させない）。



)
},
{
id: 13,
title: "問題 13 システムとデータの保護1",
question: "業務に必要となるシステムやデータを保護するための機能がある。空欄Ａ～Ｄに入る語句の組み合わせとして最も適切なものを選べ。\n（ Ａ ）バックアップは、前回フルバックアップからの差分だけをバックアップする。\n（ Ｂ ）バックアップは、直前のバックアップとの差分だけをバックアップする。\n（ Ｃ ）は、ハードディスクを2重に持つ構成である。これにより一方が故障しても業務を継続できる。\n（ Ｄ ）は、2つのシステムを用意し、片方で運用を行う。もう片方は待機しておき、障害発生時に切り替えて運用する。",
choices: [
"Ａ：増分　Ｂ：差分　Ｃ：ミラーリング Ｄ：デュアルシステム",
"Ａ：差分　Ｂ：増分　Ｃ：ミラーリング Ｄ：デュプレックスシステム",
"Ａ：差分　Ｂ：増分　Ｃ：レプリケーション　Ｄ：デュプレックスシステム",
"Ａ：増分　Ｂ：差分　Ｃ：レプリケーション　Ｄ：デュアルシステム"
],
correctIndex: 1,
explanation: (

解答：イ

ここが重要

差分バックアップ (A): 「前回フルバックアップから」の変更部分をバックアップ。
増分バックアップ (B): 「直前のバックアップ（種類問わず）から」の変更部分をバックアップ。
ミラーリング (C): ハードディスクを2重に持つ構成。
デュプレックスシステム (D): 2つのシステムを用意し、片方を待機（スタンバイ）させておく構成。
デュアルシステム: 2つのシステムで「同時に同じ処理」を行い、結果を照合しながら稼働する構成。



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

解答：ウ

解説

ア ○：UPSについて適切に記述されています。サーバを安全にシャットダウンする時間を稼ぎます。
イ ○：クラスタリングについて適切に記述されています。一部のコンピュータが障害を起こしても他のコンピュータが肩代わりします。
ウ ×：「処理を中断することなく機能を維持する」のはフェールソフトです。フェールセーフは安全な方向へシステムを制御する（安全に停止させる等）概念です。
エ ○：RAID（Redundant Array of Inexpensive Disk）についての適切な説明です。



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

解答：イ

解説
ファイルサイズ：100MB ＝ 100 × 1024 × 1024 Byte
これをビット（bit）に直すため 8 を掛けます。100MB ＝ 100 × 1024 × 1024 × 8 ＝ 838,860,800 bit
1分（60秒）で送るための速度：838,860,800 ÷ 60秒 ≒ 13,981,013 bps （約14Mbps）
選択肢の中で約14Mbps以上出せるのは 100Mbps の規格です。

10BASE-T: 10Mbps (遅い)
100BASE-TX: 100Mbps、ツイストペア（銅線）ケーブル対応。正解
100BASE-FX: 100Mbps、光ファイバケーブル。
1000BASE-LX: 1Gbps、光ファイバケーブル。



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

解答：エ

解説
単位を合わせて計算します。ファイルサイズ(Byte)はビット(bit)に変換します。
1MB ＝ 1024 × 1024 × 8 bit ＝ 8,388,608 bit
通信速度（kbpsの「k」は1000）64kbps ＝ 64,000 bps
転送時間 ＝ 8,388,608 ÷ 64,000 ≒ 131.07 秒
※概算として 1MB ≒ 1,000,000 Byte × 8 ＝ 8,000,000 bit。8,000,000 ÷ 64,000 ＝ 125秒と計算しても、選択肢からエ（131秒）を選ぶことができます。


)
},
{
id: 17,
title: "問題 17 LAN接続機器",
question: "LAN接続に利用される機器の役割について、次の文中の空欄Ａ～Ｄに入る語句の組み合わせとして最も適切なものを選べ。\n（ Ａ ）は、この機器に届いたデータを他の全てのポートに転送する。OSI参照モデルでは、物理層に属する。\n（ Ｂ ）は、OSI参照モデルにおけるデータリンク層に属する機器で、宛先MACアドレスに基づいて、宛先となるポートだけにデータを転送する。\n（ Ｃ ）は、OSI参照モデルにおけるネットワーク層に属する機器で、LANとWANなど、異なるネットワークを接続する。\n（ Ｄ ）は、コンピュータやプリンタをネットワークに接続するNICに割り当てられており、同一セグメント内のLAN通信に利用される。",
choices: [
"Ａ：リピータハブ　Ｂ：スイッチングハブ　Ｃ：ルータ　Ｄ：MACアドレス",
"Ａ：スイッチングハブ　Ｂ：リピータハブ　Ｃ：ルータ　Ｄ：MACアドレス",
"Ａ：ルータ　Ｂ：スイッチングハブ　Ｃ：MACアドレス　Ｄ：リピータハブ",
"Ａ：リピータハブ　Ｂ：MACアドレス　Ｃ：スイッチングハブ　Ｄ：ルータ"
],
correctIndex: 0,
explanation: (

解答：ア

ここが重要

リピータハブ (A): 受け取ったデータを電気的に他の全ポートに転送する（物理層）。衝突が起きやすい。
スイッチングハブ (B): 宛先MACアドレスを読み取って、該当するポートにだけ転送する（データリンク層）。
ルータ (C): 異なるネットワーク（LANとWANなど）を接続する。IPアドレスを元に経路選択（ルーティング）を行う（ネットワーク層）。
MACアドレス (D): NIC（ネットワークインターフェースカード）に割り当てられた物理的な住所。



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

解答：エ

解説

ア ×：同じセグメント（LAN内）であれば、ブロードバンドルータを介して無線と有線の端末間で通信可能です。
イ ×：IPマスカレード（NAT/NAPT）が有効なルータがあるため、LAN内の端末はプライベートIPアドレスのままでインターネットと通信できます。
ウ ×：アと同様に、無線LANからルータ経由で有線プリンタにデータ送信可能です。
エ ○：PC-A〜ルータ間が11Mbps、ルータ〜PC-B間が100Mbpsの場合、システム全体でのボトルネックである遅い方（11Mbps）に通信速度は制限されます。

      <div className="mt-4 bg-white p-3 border border-gray-200 rounded">
        <p className="font-bold mb-2">参考：無線LAN規格</p>
        <table className="w-full text-xs text-left border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-1">規格</th>
              <th className="border border-gray-300 p-1">周波数帯</th>
              <th className="border border-gray-300 p-1">最大速度</th>
            </tr>
          </thead>
          <tbody>
            <tr><td className="border p-1">11b</td><td className="border p-1">2.4GHz</td><td className="border p-1">11Mbps</td></tr>
            <tr><td className="border p-1">11a</td><td className="border p-1">5GHz</td><td className="border p-1">54Mbps</td></tr>
            <tr><td className="border p-1">11g</td><td className="border p-1">2.4GHz</td><td className="border p-1">54Mbps</td></tr>
            <tr><td className="border p-1">11n (Wi-Fi 4)</td><td className="border p-1">2.4/5GHz</td><td className="border p-1">最大600Mbps</td></tr>
            <tr><td className="border p-1">11ac (Wi-Fi 5)</td><td className="border p-1">5GHz</td><td className="border p-1">最大6.9Gbps</td></tr>
            <tr><td className="border p-1">11ax (Wi-Fi 6)</td><td className="border p-1">2.4/5GHz</td><td className="border p-1">最大9.6Gbps</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)
},
{
id: 19,
title: "問題 19 LAN、ネットワーク",
question: "LANやネットワークに関する記述のうち、最も不適切なものはどれか。",
choices: [
"WANは、本社－支店間などの地理的に離れた拠点のLAN同士を接続することである。",
"VPNは、社外からインターネットを経由してPCを社内LANに接続する際、通信のセキュリティを確保するために使われる。",
"無線LANと有線LANは、同じ事業所内の同一セグメントでは併用することができない。",
"IPv6は、IPアドレス空間の枯渇問題を解消するため、IPv4にかわるプロトコルとして設計された。"
],
correctIndex: 2,
explanation: (

解答：ウ

解説

ア ○：WAN (Wide Area Network) は外部との接続、あるいは地理的に離れた拠点間を結ぶネットワークです。
イ ○：VPN (Virtual Private Network) はインターネット回線上に仮想的な専用線を構築し、暗号化等により安全な通信を実現します。
ウ ×：無線LANルータ等には有線LAN用のポートも備わっていることが多く、無線LANと有線LANは同一セグメント内で問題なく併用できます。
エ ○：IPv4(32ビット)の枯渇問題に対応するため、より広範な空間をカバーできるIPv6(128ビット)が設計されました。



)
},
{
id: 20,
title: "問題 20 無線LAN",
question: "無線LANに関する記述として、最も不適切なものはどれか。",
choices: [
"ある事務所にパソコンが3台以上あり、お互いに通信する必要がある場合には、インフラストラクチャーモードを利用しなければならない。",
"ブリッジタイプとして設定された無線LANアクセスポイントは、IPルーティングを行うので、IPアドレスが設定されていなければならない。",
"事務所内のLANだけでなく、インターネットへも接続する無線LANアクセスポイントは、ルータタイプとして設定される。",
"無線LANアクセスポイントと、無線LANを利用する端末やプリンタは、共通のSSIDを設定する。"
],
correctIndex: 1,
explanation: (

解答：イ

ここが重要
インフラストラクチャーモード: アクセスポイントを介して複数機器で通信する形態（3台以上なら必須）。
アドホックモード: 機器同士が直接通信する形態（1対1など）。
ルータタイプ vs ブリッジタイプ: ルータタイプは異なるネットワークを接続しIPルーティングを行います。一方ブリッジタイプは、単にデータ転送の中継を行うだけの機能（スイッチングハブのような動作）であり、IPルーティングは行いません。
SSID: 無線LANアクセスポイントを識別するための名前。


イ ×：ブリッジタイプとして設定されたアクセスポイントはIPルーティングを行わず、宛先MACアドレスによる通信制御を行います。そのため機器自体にルーティング用のIPアドレスを設定する必要はありません。


)
},
{
id: 21,
title: "問題 21 無線LAN2",
question: "無線通信技術に関する記述として、最も適切なものを選べ。",
choices: [
"無線LAN 規格IEEE802.11acに対応する機器は、2.4 GHz 帯を利用するのでBluetoothを使用する機器から電波干渉を受ける。",
"無線LAN 規格IEEE802.11axは、Wi-Fi 6と呼ばれることもある。",
"無線LANの電波干渉が発生している場合、使用する周波数帯を変更した場合でも電波干渉の対策にはならない。",
"5GHz帯の周波数帯を使った無線LAN通信は通信速度が速く、通信距離が離れても通信が安定しているという特徴がある。"
],
correctIndex: 1,
explanation: (

解答：イ

ここが重要
周波数帯の特徴

2.4GHz帯: 壁や障害物に強いが、Bluetoothや電子レンジなどと同じ帯域のため電波干渉が起きやすい。
5GHz帯: 電波干渉を受けにくく高速で安定しているが、障害物に弱く、距離が離れると不安定になりやすい。



ア ×：11ac は 5GHz 帯を使用します。
イ ○：11ax は Wi-Fi 6 と呼ばれます。適切です。
ウ ×：干渉が起きている場合、2.4GHzから5GHzに変更することは有効な対策になります。
エ ×：5GHz帯は障害物に弱く、通信距離が離れると通信が「不安定」になります。


)
}
];

// ==========================================
// Main App Component
// ==========================================
export default function App() {
const [userId, setUserId] = useState('');
const [isLoggedIn, setIsLoggedIn] = useState(false);
const [isLoading, setIsLoading] = useState(false);

// User Data State
const [historyData, setHistoryData] = useState([]);
const [needsReviewSet, setNeedsReviewSet] = useState(new Set());

// App State
const [currentMode, setCurrentMode] = useState('MENU'); // 'MENU', 'QUIZ', 'HISTORY'
const [quizFilter, setQuizFilter] = useState('ALL'); // 'ALL', 'INCORRECT', 'REVIEW'
const [activeQuizList, setActiveQuizList] = useState([]);
const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
const [selectedChoice, setSelectedChoice] = useState(null);
const [isAnswered, setIsAnswered] = useState(false);
const [score, setScore] = useState({ correct: 0, total: 0 });

// ------------------------------------------
// Firebase Data Fetch / Save
// ------------------------------------------
const fetchUserData = async (id) => {
setIsLoading(true);
try {
if (!db) throw new Error("Database not initialized");
const docRef = doc(db, APP_ID, id);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
const data = docSnap.data();
setHistoryData(data.history || []);
setNeedsReviewSet(new Set(data.needsReview || []));
} else {
setHistoryData([]);
setNeedsReviewSet(new Set());
}
setIsLoggedIn(true);
} catch (error) {
console.error("Error fetching data: ", error);
// Fallback for offline or invalid setup
setIsLoggedIn(true);
} finally {
setIsLoading(false);
}
};

const saveUserData = async (newHistory, newNeedsReviewArr) => {
try {
if (!db) return;
const docRef = doc(db, APP_ID, userId);
await setDoc(docRef, {
history: newHistory,
needsReview: newNeedsReviewArr,
lastUpdated: new Date().toISOString()
}, { merge: true });
} catch (error) {
console.error("Error saving data: ", error);
}
};

const handleLogin = (e) => {
e.preventDefault();
if (userId.trim()) {
fetchUserData(userId.trim());
}
};

const handleLogout = () => {
setIsLoggedIn(false);
setUserId('');
setHistoryData([]);
setNeedsReviewSet(new Set());
setCurrentMode('MENU');
};

// ------------------------------------------
// Quiz Logic
// ------------------------------------------
const getIncorrectIds = () => {
const latestAnswers = {};
historyData.forEach(h => {
// Keep only the latest answer for each question
if (!latestAnswers[h.questionId] || h.timestamp >= latestAnswers[h.questionId].timestamp) {
latestAnswers[h.questionId] = h;
}
});
return Object.values(latestAnswers)
.filter(h => !h.correct)
.map(h => h.questionId);
};

const startQuiz = (filterType) => {
setQuizFilter(filterType);
let list = [];
if (filterType === 'ALL') {
list = [...questionsData];
} else if (filterType === 'INCORRECT') {
const incorrectIds = getIncorrectIds();
list = questionsData.filter(q => incorrectIds.includes(q.id));
} else if (filterType === 'REVIEW') {
list = questionsData.filter(q => needsReviewSet.has(q.id));
}

if (list.length === 0) {
  alert("対象の問題がありません。");
  return;
}

// Shuffle list
list.sort(() => Math.random() - 0.5);
setActiveQuizList(list);
setCurrentQuestionIndex(0);
setIsAnswered(false);
setSelectedChoice(null);
setScore({ correct: 0, total: 0 });
setCurrentMode('QUIZ');
};

const handleSelectChoice = (index) => {
if (isAnswered) return;

const currentQ = activeQuizList[currentQuestionIndex];
const isCorrect = index === currentQ.correctIndex;

setSelectedChoice(index);
setIsAnswered(true);

const newScore = {
  correct: score.correct + (isCorrect ? 1 : 0),
  total: score.total + 1
};
setScore(newScore);

// Save history
const historyEntry = {
  questionId: currentQ.id,
  correct: isCorrect,
  timestamp: Date.now()
};
const newHistory = [...historyData, historyEntry];
setHistoryData(newHistory);
saveUserData(newHistory, Array.from(needsReviewSet));
};

const handleNextQuestion = () => {
if (currentQuestionIndex < activeQuizList.length - 1) {
setCurrentQuestionIndex(prev => prev + 1);
setIsAnswered(false);
setSelectedChoice(null);
} else {
alert(テスト終了！\n正解数: ${score.correct} / ${score.total});
setCurrentMode('MENU');
}
};

const toggleReviewFlag = (questionId) => {
const newSet = new Set(needsReviewSet);
if (newSet.has(questionId)) {
newSet.delete(questionId);
} else {
newSet.add(questionId);
}
setNeedsReviewSet(newSet);
saveUserData(historyData, Array.from(newSet));
};

// ------------------------------------------
// Renderers
// ------------------------------------------
if (!isLoggedIn) {
return (



スマート問題集
4-3 システム構成とネットワーク



ユーザーID (合言葉)
<input
type="text"
value={userId}
onChange={(e) => setUserId(e.target.value)}
className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
placeholder="例: secret-key-123"
required
/>
同じ合言葉を使えば、どの端末からでも続きから学習できます。


{isLoading ?  : '学習を始める'}




);
}

if (currentMode === 'MENU') {
const incorrectCount = getIncorrectIds().length;
const reviewCount = needsReviewSet.size;

return (
  <div className="min-h-screen bg-gray-100 p-4 font-sans">
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-sm">
        <div>
          <p className="text-sm text-gray-500">ログイン中:</p>
          <p className="font-bold">{userId}</p>
        </div>
        <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 flex items-center text-sm">
          <LogOut className="w-4 h-4 mr-1" /> ログアウト
        </button>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 mb-6 text-center">学習メニュー</h2>
        <div className="space-y-4">
          <button
            onClick={() => startQuiz('ALL')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg shadow flex justify-between items-center"
          >
            <span>すべての問題 ({questionsData.length}問)</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => startQuiz('INCORRECT')}
            disabled={incorrectCount === 0}
            className={`w-full font-bold py-4 px-6 rounded-lg shadow flex justify-between items-center
              ${incorrectCount === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600 text-white'}`}
          >
            <span>前回不正解の問題のみ ({incorrectCount}問)</span>
            <ChevronRight className="w-5 h-5" />
          </button>
          <button
            onClick={() => startQuiz('REVIEW')}
            disabled={reviewCount === 0}
            className={`w-full font-bold py-4 px-6 rounded-lg shadow flex justify-between items-center
              ${reviewCount === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-yellow-500 hover:bg-yellow-600 text-white'}`}
          >
            <span>要復習の問題のみ ({reviewCount}問)</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <button
        onClick={() => setCurrentMode('HISTORY')}
        className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-6 rounded-xl shadow-sm flex justify-center items-center border border-gray-200"
      >
        <List className="w-5 h-5 mr-2" /> 学習履歴を確認する
      </button>
    </div>
  </div>
);
}

if (currentMode === 'HISTORY') {
return (




 学習履歴一覧

<button
onClick={() => setCurrentMode('MENU')}
className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg flex items-center"
>
 戻る

      <div className="space-y-4">
        {questionsData.map(q => {
          const qHistory = historyData.filter(h => h.questionId === q.id).sort((a,b) => b.timestamp - a.timestamp);
          const latest = qHistory[0];
          const isReview = needsReviewSet.has(q.id);
          
          return (
            <div key={q.id} className="border border-gray-200 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <div className="flex-1">
                <p className="font-bold text-gray-800 text-sm sm:text-base">{q.title}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className={`text-xs px-2 py-1 rounded font-bold ${latest ? (latest.correct ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700') : 'bg-gray-100 text-gray-500'}`}>
                    {latest ? (latest.correct ? '最終: 正解' : '最終: 不正解') : '未解答'}
                  </span>
                  <span className="text-xs text-gray-500">回答回数: {qHistory.length}回</span>
                </div>
              </div>
              <button
                onClick={() => toggleReviewFlag(q.id)}
                className={`mt-3 sm:mt-0 px-3 py-1.5 rounded-lg text-sm flex items-center border ${isReview ? 'bg-yellow-50 text-yellow-700 border-yellow-300' : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'}`}
              >
                {isReview ? <CheckSquare className="w-4 h-4 mr-1" /> : <Square className="w-4 h-4 mr-1" />}
                要復習
              </button>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);
}

// currentMode === 'QUIZ'
const currentQ = activeQuizList[currentQuestionIndex];
const isReviewing = needsReviewSet.has(currentQ.id);

return (


{/* Header */}

<button onClick={() => setCurrentMode('MENU')} className="text-gray-500 hover:text-gray-800 flex items-center">
 中断


{currentQuestionIndex + 1} / {activeQuizList.length} 問

    {/* Question Card */}
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
      <div className="bg-blue-600 p-4 text-white">
        <h2 className="font-bold text-lg">{currentQ.title}</h2>
      </div>
      <div className="p-4 sm:p-6">
        <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">{currentQ.question}</p>
      </div>
    </div>

    {/* Choices */}
    <div className="space-y-3">
      {currentQ.choices.map((choice, idx) => {
        let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all flex items-start ";
        let icon = null;

        if (!isAnswered) {
          btnClass += "bg-white border-gray-200 hover:border-blue-400 hover:bg-blue-50 text-gray-700";
        } else {
          if (idx === currentQ.correctIndex) {
            btnClass += "bg-green-50 border-green-500 text-green-800";
            icon = <Check className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" />;
          } else if (idx === selectedChoice) {
            btnClass += "bg-red-50 border-red-500 text-red-800";
            icon = <X className="w-6 h-6 text-red-500 mr-2 flex-shrink-0" />;
          } else {
            btnClass += "bg-gray-50 border-gray-200 text-gray-400 opacity-60";
          }
        }

        return (
          <button
            key={idx}
            disabled={isAnswered}
            onClick={() => handleSelectChoice(idx)}
            className={btnClass}
          >
            {!isAnswered && <span className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center mr-3 flex-shrink-0 text-xs text-gray-500">{['ア','イ','ウ','エ','オ'][idx]}</span>}
            {icon}
            <span className="leading-snug">{choice}</span>
          </button>
        );
      })}
    </div>

    {/* Explanation Area */}
    {isAnswered && (
      <div className="mt-6 bg-white border-2 border-gray-200 rounded-xl p-4 sm:p-6 shadow-sm animate-fade-in-up">
        <div className="flex justify-between items-center mb-4 pb-2 border-b">
          <h3 className="font-bold text-xl text-gray-800 flex items-center">
            <AlertCircle className="w-5 h-5 text-blue-500 mr-2" /> 解説
          </h3>
          <button
            onClick={() => toggleReviewFlag(currentQ.id)}
            className={`px-4 py-2 rounded-full text-sm font-bold flex items-center border transition-colors ${
              isReviewing ? 'bg-yellow-100 text-yellow-800 border-yellow-300' : 'bg-white text-gray-500 border-gray-300 hover:bg-gray-50'
            }`}
          >
            {isReviewing ? <CheckSquare className="w-4 h-4 mr-2" /> : <Square className="w-4 h-4 mr-2" />}
            要復習
          </button>
        </div>
        
        <div className="explanation-content">
          {currentQ.explanation}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={handleNextQuestion}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow flex items-center"
          >
            {currentQuestionIndex < activeQuizList.length - 1 ? '次の問題へ' : '結果を見る'}
            <ChevronRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </div>
    )}
  </div>
</div>
);
}