import WebsiteCards from "../../cards/WebsiteCards.jsx";

const CreatorAssignedWebsiteSection = ({ websites }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
      {websites.map((website, idx) => (
        <WebsiteCards key={idx} site={website} />
      ))}
    </div>
  );
};

export default CreatorAssignedWebsiteSection;
