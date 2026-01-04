import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Briefcase, Calendar, CheckCircle } from 'lucide-react';
import { experience } from '@/data/portfolio';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Return null if no experience data
  if (!experience || experience.length === 0) {
    return null;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: (index) => ({
      opacity: 0,
      x: index % 2 === 0 ? -50 : 50,
    }),
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div
            variants={containerVariants}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold font-display mb-4">
              Work <span className="text-gradient">Experience</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
              My professional journey and career highlights
            </p>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary-500 to-accent-500 rounded-full"></div>

            {/* Timeline Items */}
            <motion.div variants={containerVariants} className="space-y-12">
              {experience.map((item, index) => (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={itemVariants}
                  className={`flex flex-col md:flex-row items-center gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content Card */}
                  <div className="w-full md:w-[calc(50%-2rem)]">
                    <Card className="hover-glow hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <Briefcase className="h-8 w-8 text-primary-500" />
                          <Badge variant="outline" className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {item.duration}
                          </Badge>
                        </div>
                        <CardTitle className="text-xl">{item.position}</CardTitle>
                        <CardDescription className="text-primary-600 font-medium">
                          {item.company}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-700 mb-4">{item.description}</p>
                        {item.achievements && item.achievements.length > 0 && (
                          <div className="space-y-2">
                            <p className="font-semibold text-sm text-gray-600">Key Achievements:</p>
                            <ul className="space-y-1">
                              {item.achievements.map((achievement, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{achievement}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:block relative">
                    <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full ring-4 ring-white shadow-lg"></div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-[calc(50%-2rem)]"></div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
