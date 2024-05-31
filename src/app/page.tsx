import Image from "next/image";
import ArrayQuestion from "./pages/Questions/page"

export default function Home() {
  return (
    <>
   <nav style={{ backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '16px',fontWeight:"bold" }}>
    Strivers 79 Last Moment DSA Sheet – Ace Interviews
  </nav>

    <ArrayQuestion/>
    </>
  );
}
