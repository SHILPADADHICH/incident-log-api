import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Incident from '../models/incident.model';

// Load environment variables
dotenv.config();

const sampleIncidents = [
  {
    title: "Chatbot Bypassing Ethical Guidelines",
    description: "An AI chatbot was found generating harmful content despite content filters being in place",
    severity: "High",
    reported_at: new Date()
  },
  {
    title: "Biased Model Responses",
    description: "Our classification model exhibits demographic bias in hiring recommendations",
    severity: "Medium",
    reported_at: new Date(Date.now() - 86400000) 
  },
  {
    title: "Privacy Data Leak",
    description: "Model memorization led to potential exposure of training data containing personal information",
    severity: "High",
    reported_at: new Date(Date.now() - 172800000) 
  },
  {
    title: "Unauthorized API Access",
    description: "Detection of unauthorized access attempts to AI model API endpoints from unrecognized IP addresses",
    severity: "Medium",
    reported_at: new Date(Date.now() - 259200000) 
  },
  {
    title: "Prompt Injection Vulnerability",
    description: "Users found capable of manipulating AI responses through specially crafted input prompts that bypass safety measures",
    severity: "High",
    reported_at: new Date(Date.now() - 345600000) 
  },
  {
    title: "Resource Consumption Attack",
    description: "Detection of malicious inputs designed to maximize computational resources, increasing service costs",
    severity: "Medium",
    reported_at: new Date(Date.now() - 432000000) 
  },
  {
    title: "Model Output Inconsistency",
    description: "Different results observed for identical inputs under same conditions, raising concerns about determinism",
    severity: "Low",
    reported_at: new Date(Date.now() - 518400000) 
  },
  {
    title: "Unintended Model Capabilities",
    description: "Model demonstrated capabilities beyond its intended scope, suggesting potential for misuse in unauthorized domains",
    severity: "Medium",
    reported_at: new Date(Date.now() - 604800000)
  },
  {
    title: "User Deception Tactics",
    description: "AI generated content that mimics authoritative sources without proper attribution or disclaimers",
    severity: "High",
    reported_at: new Date(Date.now() - 691200000)
  },
  {
    title: "Feedback Loop Amplification",
    description: "Detected instance where model reinforces harmful patterns based on user engagement metrics",
    severity: "High",
    reported_at: new Date(Date.now() - 777600000)
  },
  {
    title: "Physical System Control Risk",
    description: "AI recommendation for robotic system operation exceeded safety parameters in testing environment",
    severity: "High",
    reported_at: new Date(Date.now() - 864000000) 
  },
  {
    title: "Interpretability Failure",
    description: "Unable to explain model decision pathway for critical healthcare recommendation despite explainability tools",
    severity: "Medium",
    reported_at: new Date(Date.now() - 950400000) 
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log('✅ Connected to MongoDB');

    await Incident.deleteMany({});
    console.log('🗑️ Cleared existing incidents');


    const result = await Incident.insertMany(sampleIncidents);
    console.log(`📝 Added ${result.length} sample incidents`);

    console.log('Sample data:');
    console.log(JSON.stringify(result, null, 2));

   
    await mongoose.disconnect();
    console.log('📤 Disconnected from MongoDB');

    console.log('✅ Database seeding completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};


seedDatabase(); 