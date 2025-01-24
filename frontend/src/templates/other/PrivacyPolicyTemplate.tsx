import { useEffect, useState } from "react";
import { TitleMolecule } from "../../molecules/TitleMolecule";
import axios from "axios";
import ReactMarkdown from 'react-markdown';

export const PrivacyPolicyTemplate = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState('')
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('/privacyPolicy.md')
        setPrivacyPolicy(res.data)
      } catch {
        setPrivacyPolicy('プライバシーポリシーが取得できませんでした。')
      }
    })()
  },[])
  return (
    <>
      <TitleMolecule title="プライバシーポリシー" />
      {<ReactMarkdown>{privacyPolicy}</ReactMarkdown>}
    </>
  );
};
