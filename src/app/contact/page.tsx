import type { Metadata } from "next";
import { MapPin, Mail, Clock, Phone, Zap } from "lucide-react";
import AnimatedSection from "@/components/AnimatedSection";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { StaggerContainer, StaggerItem } from "@/components/StaggerChildren";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with aBrandr Solutions. Start your project today — we respond within 24 hours. Office: Spencer Plaza, Chennai, India.",
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Visit Us",
    details: ["Spencer Plaza", "Anna Salai, Chennai", "Tamil Nadu, India"],
  },
  {
    icon: Mail,
    title: "Email Us",
    details: ["hello@abrandr.com", "careers@abrandr.com"],
  },
  {
    icon: Clock,
    title: "Response Time",
    details: ["We respond within 24 hours", "Mon–Fri, 9 AM – 6 PM IST"],
  },
  {
    icon: Phone,
    title: "Call Us",
    details: ["+91 44 XXXX XXXX", "+1 (555) XXX-XXXX"],
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Start the Conversation"
        title="Got a big idea?"
        titleAccent="Let's make it real."
        description="Drop us a line. No sales pitch, no pressure — just a straight conversation about what you're building and how we can help you win."
      />

      {/* Form + Info */}
      <section className="pb-20 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-16">
            {/* Form */}
            <AnimatedSection className="lg:col-span-2" variant="fadeLeft">
              <div className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 relative overflow-hidden group">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand/30 to-transparent" />
                <h2 className="text-2xl font-bold text-dark-heading mb-2">
                  Project Planner
                </h2>
                <p className="text-dark-text text-sm mb-8">
                  Fill out the form below and we&apos;ll get started on
                  understanding your vision.
                </p>
                <ContactForm />
              </div>
            </AnimatedSection>

            {/* Contact Info */}
            <div>
              <StaggerContainer className="space-y-6" staggerDelay={0.1}>
                {contactInfo.map((info) => (
                  <StaggerItem key={info.title} direction="right">
                    <div className="glass-card rounded-2xl p-6 group hover:border-brand/20 transition-all duration-500 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-all duration-500">
                            <info.icon className="text-brand" size={20} />
                          </div>
                          <h3 className="font-semibold text-dark-heading text-sm">
                            {info.title}
                          </h3>
                        </div>
                        {info.details.map((detail) => (
                          <p key={detail} className="text-sm text-dark-text">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </StaggerItem>
                ))}

                {/* 24-hour promise */}
                <StaggerItem direction="scale">
                  <div className="glass-card rounded-2xl p-6 border-brand/20 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-brand/[0.05] to-transparent" />
                    <div className="relative z-10 text-center">
                      <div className="w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-3">
                        <Zap className="text-brand" size={24} />
                      </div>
                      <h3 className="font-semibold text-dark-heading mb-2">
                        24-Hour Response Promise
                      </h3>
                      <p className="text-sm text-dark-text">
                        We take every inquiry seriously. Your project deserves a
                        thoughtful response — and you&apos;ll get one within 24
                        hours.
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
