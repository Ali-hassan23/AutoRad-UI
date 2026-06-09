type ChatHistoryMessage = {
  role: string;
  content: string;
};

export async function chatWithReport(
  report: string,
  message: string,
  history: ChatHistoryMessage[]
) {
  // Strip any messages with missing/empty content before sending
  const cleanHistory = history
    .filter(m => m.role && m.content && m.content.trim() !== "")
    .map(m => ({ role: m.role, content: m.content }));

  const res = await fetch("/api/chat/report", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      report,
      message,
      history: cleanHistory
    })
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Chat request failed:", res.status, errorText);
    throw new Error(`Chat request failed (${res.status}): ${errorText}`);
  }

  return res.json();
}
