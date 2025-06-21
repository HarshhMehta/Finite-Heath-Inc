import { motion } from "framer-motion";
import workimg1 from "../../assets/work_img1.webp";

import workimg3 from "../../assets/workimg3.webp";

import workvid1 from "../../assets/work_vid1.mp4";

import workvid3 from "../../assets/workvid3.mp4";


const Work = ({
  setCursorProps,
}: {
  setCursorProps: React.Dispatch<
    React.SetStateAction<{
      text: string;
      isVisible: boolean;
    }>
  >;
}) => {
  const plans = [
    {
      name: "Fit",
      price: "$50/visit",
      description: "Digital medicine: Telehealth services only - phone, text, email as needed",
      video: workvid1,
      image: workimg1,
    },
    {
      name: "Life",
      price: "$150/month",
      description: "Comprehensive healthcare package",
      features: [
        "Telemedicine/digital health as needed",
        "1x/year comprehensive in-home evaluation with OMT",
        "In-home Evaluation",
        "Complete History and physical",
        "Cardiac Ultrasound for gross evaluation/EKG",
        "Medication reconciliation",
        "Define target goals and comprehensive plan assessment to achieve it",
        "Nutrition Evaluation/education",
        "Fitness Planning",
        "Inpatient monitoring, advocating and management"
      ],
    },
    {
      name: "Additional Services",
      price: "$120",
      description: "Additional OMT Session",
      video: workvid3,
      image: workimg3,
    }
  ];

  return (
    <div
      id="work"
      className="max-w-screen-2xl mx-auto px-5 sm:px-52 py-20 bg-white"
    >
      <div className="featured flex items-center gap-3">
        <svg
          className="size-3 sm:size-7"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.41908 4.56679L6.13722 0L4.85418 4.92566L0 6L4.85418 7.25435L6.13722 12L7.3276 7.25435L12 6L7.41908 4.56679Z"
            fill="currentColor"
          ></path>
        </svg>
        <h2 className="capitalize font-normal text-sm sm:text-3xl">
          Services
        </h2>
      </div>

      <h2 className="text-7xl sm:text-[14rem] tracking-tight my-5 overflow-hidden">
        <motion.span
          initial={{ y: "90%", rotate: 30 }}
          whileInView={{ y: "0", rotate: 0 }}
          viewport={{ once: true }}
          transition={{ ease: [0.22, 1, 0.36, 1], duration: 1.5 }}
          className="inline-block origin-left"
        >
          Plans
        </motion.span>
      </h2>
      <p className="text-lg leading-[1.5rem] sm:text-xl sm:opacity-40 mb-16">
        We offer flexible plans to fit your needs. Choose Fit for pay-per-visit telehealth or Life for unlimited care, including a yearly in-home evaluation, cardiac screening, personalized plans for health, nutrition, and fitness, plus ongoing support whenever you need it.
      </p>

      {/* Plans Section */}
      <div className="space-y-24">
        {plans.map((plan, index) => (
          <div key={plan.name} className="w-full">
            <motion.div
              className={`flex flex-col ${plan.video && plan.image ? 'lg:flex-row lg:items-start' : ''} gap-12`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              {/* Plan Details - Left Column */}
              <div className={plan.video && plan.image ? "lg:w-1/2" : "w-full"}>
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <h3 className="text-4xl font-bold text-gray-900 mb-3">
                    {plan.name}
                  </h3>
                  <div className="text-5xl font-extrabold text-blue-600 mb-6">
                    {plan.price}
                  </div>
                  <p className="text-gray-600 text-xl leading-relaxed mb-8">
                    {plan.description}
                  </p>

                  {plan.features && (
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-gray-900 mb-6">
                        What's Included:
                      </h4>
                      <div className="space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-4">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-3 flex-shrink-0"></div>
                            <span className="text-gray-700 text-lg leading-relaxed">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <button className="w-full bg-blue-600 text-white py-5 px-8 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl">
                    Choose {plan.name}
                  </button>
                </div>
              </div>

              {/* Video - Right Column - Only show if video and image exist */}
              {plan.video && plan.image && (
                <div className="lg:w-1/2">
                  <div className="w-full h-0 pb-[56.25%] relative rounded-2xl overflow-hidden bg-gray-100 shadow-lg">
                    <motion.div
                      onHoverStart={() =>
                        setCursorProps({ text: "View", isVisible: true })
                      }
                      onHoverEnd={() => setCursorProps({ text: "", isVisible: false })}
                      className="absolute inset-0 cursor-pointer group"
                    >
                      <img
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                        src={plan.image}
                        alt={plan.name}
                      />
                      <video
                        className="absolute inset-0 w-full h-full object-cover"
                        src={plan.video}
                        autoPlay
                        muted
                        loop
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-white text-center">
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
