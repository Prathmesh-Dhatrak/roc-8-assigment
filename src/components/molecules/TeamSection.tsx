import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamMember } from "@/types/dashboard";
import { motion } from "framer-motion";

type TeamSectionProps = {
  members: TeamMember[];
};

export const TeamSection = ({ members }: TeamSectionProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Team mood</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {members.map((member, index) => {
          const AvatarIcon = member.avatar; // Get the icon component
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
            >
              <AvatarIcon className="w-10 h-10 text-gray-500" /> {/* Render the icon */}
              <div className="flex-1">
                <h4 className="text-sm font-medium">{member.name}</h4>
                <p className="text-xs text-gray-500">{member.role}</p>
              </div>
              <span className="text-xl">
                {member.mood === "happy" ? "😊" : member.mood === "sad" ? "😔" : "😐"}
              </span>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};