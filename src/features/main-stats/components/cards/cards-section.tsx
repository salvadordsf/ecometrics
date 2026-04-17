import { Subtitle } from "@/src/components/ui/subtitle";
import React from "react";

export const CardsSection = ({
  title,
  cards,
}: {
  title: string;
  cards: React.ReactElement[];
}) => {
  return (
    <section className="flex flex-col items-center">
      <Subtitle subtitle={title} />
      <div className="flex flex-wrap justify-center gap-5 max-w-4xl">
        {cards.map((card, i) => React.cloneElement(card, { key: i }))}
      </div>
    </section>
  );
};
