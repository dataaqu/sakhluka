import { motion } from "framer-motion";
import { FiFacebook, FiInstagram } from "react-icons/fi";
import { SiAirbnb } from "react-icons/si";
import { IconType } from "react-icons";

interface CardProps {
  title: string;
  subtitle: string;
  Icon: IconType;
  href: string;
  bgGradient: string;
}

const Contact = () => {
  return (
    <section className="bg-background py-32">
      <div className="container mx-auto px-4">
        <div className="mb-14 text-center">
          <motion.h1 
            initial={{ y: 48, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.75 }}
            className="mb-8 md:mb-20 text-2xl md:text-4xl font-black uppercase text-foreground text-center"
          >
            For booking or detail information contact us
          </motion.h1>
        </div>
        <HoverDevCards />
      </div>
    </section>
  );
};

const HoverDevCards = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="grid gap-10 grid-cols-1 md:grid-cols-3 justify-items-center max-w-4xl">
        <motion.div
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.1 }}
        >
          <Card
            title="Facebook"
            subtitle="Connect with us"
            href="https://facebook.com"
            Icon={FiFacebook}
            bgGradient="from-blue-600 to-blue-700"
          />
        </motion.div>
        <motion.div
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.2 }}
        >
          <Card
            title="Instagram"
            subtitle="Follow our journey"
            href="https://instagram.com"
            Icon={FiInstagram}
            bgGradient="from-purple-600 via-pink-500 to-orange-400"
          />
        </motion.div>
        <motion.div
          initial={{ y: 48, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.75, delay: 0.3 }}
        >
          <Card
            title="Airbnb"
            subtitle="Book with us"
            href="https://airbnb.com"
            Icon={SiAirbnb}
            bgGradient="from-red-500 to-red-600"
          />
        </motion.div>
      </div>
    </div>
  );
};

const Card = ({ title, subtitle, Icon, href, bgGradient }: CardProps) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-44 h-44 p-6 rounded-md border-[1px] border-slate-300 relative overflow-hidden group bg-transparent flex flex-col justify-center items-center text-center"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${bgGradient} translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300`} />

      <Icon className="absolute z-10 -top-12 -right-12 text-9xl text-slate-100 group-hover:text-white group-hover:rotate-12 transition-transform duration-300" />
      <h3 className="font-medium text-lg mt-6 text-white group-hover:text-white relative z-10 duration-300 mb-1">
        {title}
      </h3>
      <p className="text-sm text-white group-hover:text-white relative z-10 duration-300">
        {subtitle}
      </p>
    </a>
  );
};

export default Contact;
