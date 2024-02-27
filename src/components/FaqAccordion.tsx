"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";

const faqArray = [
  {
    question: "How do I create an account on the blog site?",
    answer:
      "To create an account, click on the 'Sign Up' button and provide the required information, including your email address and a secure password. Once registered, you can start exploring and using the site's features.",
  },
  {
    question: "How can I follow other users on the blog site?",
    answer:
      "Simply navigate to the profile of the user you want to follow and click on the 'Follow' button. You will then receive updates on their latest blog posts in your feed.",
  },
  {
    question: "Can I unfollow a user if I change my mind?",
    answer:
      "Yes, you can unfollow a user at any time. Go to the profile of the user you are following and click on the 'Unfollow' button. You will no longer receive updates from that user.",
  },
  {
    question: "How do I post a blog on the site?",
    answer:
      "Click on the 'Create Post' button, then enter your blog content in the editor provided. You can also add images to enhance your post. Once you're satisfied, click 'Publish' to share your blog with the community.",
  },
  {
    question: "Is there an editor to format my blog posts?",
    answer:
      "Yes, the site has a built-in editor that allows you to format your blog posts with headings, lists, and other styling options. It provides a user-friendly interface to make your content visually appealing.",
  },
  {
    question: "Can I upload images to accompany my blog posts?",
    answer:
      "Absolutely! You can upload images directly from your device while creating a blog post. This feature allows you to include visuals that complement your written content.",
  },
  {
    question: "How do I leave comments on blog posts?",
    answer:
      "To leave a comment, scroll to the bottom of the blog post and find the comment section. Type your comment and click 'Submit.' Engaging in discussions with other users is a great way to interact within the community.",
  },
  {
    question: "How can I edit my user information?",
    answer:
      "Go to your profile settings, where you can update your user information such as your display name, bio, and profile picture. Make sure to save changes after editing.",
  },
  {
    question: "What should I do if I forget my password?",
    answer:
      "If you forget your password, click on the 'Forgot Password' link on the login page. Follow the instructions to reset your password through the email associated with your account.",
  },
  {
    question: "How can I change my password for security reasons?",
    answer:
      "You can change your password by going to your account settings and selecting the option to update your password. Enter your current password, then set and confirm your new password before saving the changes.",
  },
  {
    question:
      "Is there a way to categorize or tag my blog posts for better organization?",
    answer:
      "Yes, our platform allows you to add tags to your blog posts. When creating or editing a post, you can assign relevant tags that will help users find your content based on specific topics.",
  },
  {
    question:
      "How does the site's algorithm determine the content displayed in my feed?",
    answer:
      "The algorithm takes into account your interests, the users you follow, and popular content within the community. It aims to curate a personalized feed to ensure you see the most relevant and engaging posts.",
  },
  {
    question:
      "Are there privacy settings to control who can see my blog posts and comments?",
    answer:
      "Yes, the platform offers privacy settings that allow you to customize the visibility of your content. You can choose to make your posts public, visible to only your followers, or private to a select group of users.",
  },
  {
    question:
      "Is there a word limit for blog posts, and can I save drafts before publishing?",
    answer:
      "While there is no strict word limit, we recommend keeping blog posts concise for a better reading experience. You can save drafts at any point during the writing process and come back to edit or publish them later.",
  },
  {
    question: "How can I customize the appearance of my blog profile?",
    answer:
      "You can personalize your blog profile by adjusting settings such as theme colors, layout, and fonts. Explore the customization options in your profile settings to create a unique and visually appealing blog space.",
  },
  {
    question:
      "What measures are in place to combat spam and ensure a high-quality community?",
    answer:
      "We employ advanced spam detection algorithms and rely on community reporting. Additionally, our moderation team actively monitors content to maintain a positive environment and swiftly address any issues.",
  },
  {
    question:
      "Can I export my blog posts or download a copy for backup purposes?",
    answer:
      "Yes, the platform provides an option to export your blog posts. You can download a copy of your content in a standard format, ensuring you have a backup in case of any unforeseen circumstances.",
  },
];

export default function FaqAccordion() {
  return (
    <Accordion>
      {faqArray.map((faq, index) => (
        <AccordionItem
          key={index}
          title={faq.question}
          classNames={{
            heading: "text-lg font-semibold",
            content: "text-sm ",
            indicator: "text-dark-200",
          }}
        >
          {faq.answer}
        </AccordionItem>
      ))}
    </Accordion>
  );
}
