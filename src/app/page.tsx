import { applicationFactors } from "@/types/attribute";
import Image from "next/image";
import FactorSelector from "@/components/selector"; // Adjust the import path as necessary

export default function Home() {
  return <FactorSelector factors={applicationFactors} 
    // onSelect={(selectedFactor) => console.log(selectedFactor)}
    />;
}
