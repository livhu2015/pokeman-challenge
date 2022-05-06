import { useState, useCallback } from "react";

export const InfoTabs = (props: InfoTabsProps) => {
  const { abilities, items, stats } = props;
  const [tabs, setTabs] = useState(["Abilities", "Items", "Stats"]);
  const [selectedTab, setSelectedTab] = useState("Abilities");
  const [content, setContent] = useState(abilities);

  const handleSelectedTab = useCallback(
    (tab: any) => {
      setSelectedTab(tab);
      switch (tab) {
        case "Abilities":
          setContent(abilities);
          break;
        case "Items":
          setContent(items);
          break;
        case "Stats":
          setContent(stats);
          break;
      }
    },
    [abilities, items, stats]
  );

  return (
    <div className="flex shadow-lg p-2 mx-36 place-items-center">
      <div className="flex-initial flex flex-col p-10 place-items-start">
        {tabs.map((tab) => (
          <button
            onClick={(e) => handleSelectedTab(tab)}
            className={
              selectedTab == tab
                ? "p-2 border-l-2 border-l-accent font-black"
                : "p-2"
            }
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1 px-10">
        {content.length == 0 && (
          <p className="font-medium text-xl">No {selectedTab}</p>
        )}
        <ol>
          {content.map((value: string) => (
            <li className="font-medium text-xl">- {value}</li>
          ))}
        </ol>
      </div>
    </div>
  );
};
interface InfoTabsProps {
  abilities: any;
  items: any;
  stats: any;
}
