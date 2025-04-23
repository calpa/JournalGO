import { useState } from "react";
import SubmitJournalButton from "./SubmitJournalButton";

export function EmotionForm() {
  const [score, setScore] = useState(0);
  const [entry, setEntry] = useState("");

  const MAX_LENGTH = 500;

  return (
    <div className="w-full p-8 max-w-xl mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-sky-700 mb-6">🧠 今日情緒日誌</h2>

      {/* 文字輸入區塊 */}
      <div className="mb-6 pr-8">
        <textarea
          className="w-full p-4 text-gray-700 bg-gray-100 rounded-xl border-2 border-sky-200 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50 transition duration-200 ease-in-out resize-none"
          placeholder="寫下今天的心情、事件、反思..."
          rows={6}
          value={entry}
          onChange={(e) => setEntry(e.target.value)}
          maxLength={MAX_LENGTH}
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {entry.length}/{MAX_LENGTH}
        </div>
      </div>

      {/* 分數輸入區塊 */}
      {/* <div className="mb-8">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          今天的情緒分數（0-5）
        </label>
        <input
          type="range"
          min={0}
          max={5}
          step={1}
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="w-full h-2 bg-sky-200 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-xs text-gray-600 mt-1">
          {[0, 1, 2, 3, 4, 5].map((val) => (
            <span key={val}>{val}</span>
          ))}
        </div>
      </div> */}

      {/* 提交按鈕 */}
      <div className="text-center">
        <SubmitJournalButton plaintext={entry} />
      </div>
    </div>
  );
}
