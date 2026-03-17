import CreatorProfileCard from "../../cards/CreatorProfileCard.jsx";

const CreatorProfileSection = ({ creator, onEdit }) => {
  return (
    <div className="w-full lg:w-[360px] shrink-0 flex flex-col gap-6">
      <CreatorProfileCard creator={creator} onEdit={onEdit} />
    </div>
  );
};

export default CreatorProfileSection;
