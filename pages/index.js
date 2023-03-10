import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [questionInput, setQuestionInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: questionInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }
      console.log(data.result);
      setResult(data.result);
      setQuestionInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head>

      <main className={styles.main}>
        <h3>Ask a question:</h3>
        <form onSubmit={onSubmit}>
          <textarea
            type="text"
            name="question"
            placeholder="Enter a question"
            value={questionInput}
            onChange={(e) => setQuestionInput(e.target.value)}
          ></textarea>
          <input type="submit" value="Generate Answer" />
        </form>
        {/* style the result */}
        <div className={styles.result}>
          {result && <p>{result}</p>}
        </div>
      </main>
    </div>
  );
}
