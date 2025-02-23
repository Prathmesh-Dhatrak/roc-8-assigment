type TeamMemberProps = {
    name: string;
    role: string;
    avatar: string;
    mood?: 'happy' | 'neutral' | 'sad';
  };
  
  export const TeamMemberCard = ({ name, role, avatar, mood = 'neutral' }: TeamMemberProps) => {
    return (
      <div className="flex items-center gap-3 p-3 rounded-lg bg-white">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full" />
        <div className="flex-1">
          <h4 className="text-sm font-medium">{name}</h4>
          <p className="text-xs text-gray-500">{role}</p>
        </div>
        <span className="text-xl">{mood === 'happy' ? '😊' : mood === 'sad' ? '😔' : '😐'}</span>
      </div>
    );
  };
  