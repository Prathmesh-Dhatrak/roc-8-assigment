import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamMember } from "@/types/dashboard";
import { motion } from "framer-motion";

type TeamSectionProps = {
  members: TeamMember[];
};

export const TeamSection = ({ members }: TeamSectionProps) => {
  return (
    <Card className="col-span-full lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-base sm:text-lg">Team mood</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {members.map((member, index) => {
          const AvatarIcon = member.avatar;
          return (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-gray-50"
            >
              <AvatarIcon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-500" />
              <div className="flex-1 min-w-0">
                <h4 className="text-xs sm:text-sm font-medium truncate">{member.name}</h4>
                <p className="text-xs text-gray-500 truncate">{member.role}</p>
              </div>
              <span className="text-lg sm:text-xl flex-shrink-0">
                {member.mood === "happy" ? "😊" : member.mood === "sad" ? "😔" : "😐"}
              </span>
            </motion.div>
          );
        })}
      </CardContent>
    </Card>
  );
};