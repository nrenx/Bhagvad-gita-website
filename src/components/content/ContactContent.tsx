import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Mail, MessageCircle, Phone, Clock, Send, Heart, Book, Users } from 'lucide-react';
import { SOCIAL_MEDIA_LINKS } from '@/lib/content-utils';

export function ContactContent() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      description: 'Send us a detailed message and we\'ll respond within 24 hours',
      value: 'contact@bhagavadgita.digital',
      action: 'mailto:contact@bhagavadgita.digital',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant help with our live chat support',
      value: 'Available 9 AM - 6 PM IST',
      action: '#',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Phone,
      title: 'Call Us',
      description: 'Speak directly with our team for urgent matters',
      value: '+91 (XXX) XXX-XXXX',
      action: 'tel:+91XXXXXXXXXX',
      color: 'bg-purple-100 text-purple-600'
    }
  ];

  const inquiryTypes = [
    {
      icon: Book,
      title: 'Content Questions',
      description: 'Questions about translations, interpretations, or verse meanings',
      topics: ['Verse interpretations', 'Translation accuracy', 'Sanskrit pronunciation', 'Historical context']
    },
    {
      icon: Users,
      title: 'Community & Partnerships',
      description: 'Collaboration opportunities, educational partnerships, or community events',
      topics: ['Educational partnerships', 'Bulk licensing', 'Community events', 'Scholarly collaboration']
    },
    {
      icon: Heart,
      title: 'Support & Feedback',
      description: 'Technical issues, feature requests, or general feedback',
      topics: ['Bug reports', 'Feature requests', 'User feedback', 'Accessibility issues']
    }
  ];

  const faqs = [
    {
      question: 'Is the content on this website authentic?',
      answer: 'Yes, all our translations are based on traditional commentaries from respected scholars and have been reviewed by Sanskrit experts.'
    },
    {
      question: 'Can I use the content for educational purposes?',
      answer: 'Absolutely! Our content is freely available for educational, non-commercial use. For commercial use, please contact us for licensing.'
    },
    {
      question: 'How can I contribute to the project?',
      answer: 'We welcome contributions in many forms - translations, proofreading, content creation, or financial support. Contact us to learn more.'
    },
    {
      question: 'Do you offer guided study programs?',
      answer: 'We\'re developing structured study programs. Join our newsletter to be notified when they become available.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
              Get In Touch
            </Badge>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            We're Here to{' '}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Help
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Whether you have questions about the Bhagavad Gita, need technical support, 
            or want to collaborate with us, we'd love to hear from you.
          </p>
        </div>

        {/* Contact Methods */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {contactMethods.map((method, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className={`${method.color} rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center`}>
                  <method.icon className="w-8 h-8" />
                </div>
                <CardTitle className="text-xl">{method.title}</CardTitle>
                <p className="text-sm text-gray-600">{method.description}</p>
              </CardHeader>
              <CardContent className="text-center">
                <div className="font-semibold text-gray-900 mb-4">{method.value}</div>
                <Button asChild className="w-full">
                  <Link href={method.action}>
                    Contact via {method.title.split(' ')[0]}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Form */}
        <div className="mb-16">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Form */}
            <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Send Us a Message</CardTitle>
                <p className="text-gray-600">Fill out the form below and we'll get back to you as soon as possible.</p>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                        placeholder="Your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                        placeholder="Your last name"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <select className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent">
                      <option>Choose a subject</option>
                      <option>Content Question</option>
                      <option>Technical Support</option>
                      <option>Partnership Inquiry</option>
                      <option>Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <textarea
                      rows={6}
                      className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>
                  
                  <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700">
                    <Send className="w-5 h-5 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Inquiry Types */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">What can we help you with?</h2>
                <div className="space-y-4">
                  {inquiryTypes.map((type, index) => (
                    <Card key={index} className="bg-white/70 backdrop-blur-sm border-orange-200">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg p-3 flex-shrink-0">
                            <type.icon className="w-6 h-6 text-orange-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {type.topics.map((topic, topicIndex) => (
                                <Badge key={topicIndex} variant="secondary" className="text-xs">
                                  {topic}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Office Hours */}
              <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2 text-orange-600" />
                    Response Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email inquiries:</span>
                      <span className="font-medium">Within 24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Technical support:</span>
                      <span className="font-medium">Within 12 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Live chat:</span>
                      <span className="font-medium">9 AM - 6 PM IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phone support:</span>
                      <span className="font-medium">By appointment</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900 text-center mb-6">
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                {faqs.map((faq, index) => (
                  <div key={index} className="space-y-3">
                    <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Social Media */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-orange-100 to-amber-100 border-orange-200">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Connect With Our Community
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Follow us on social media for daily inspirations, updates, and community discussions 
                about the Bhagavad Gita.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-orange-600 hover:bg-orange-700">
                  <Link href={SOCIAL_MEDIA_LINKS.youtube} target="_blank">
                    YouTube Channel
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-orange-200 hover:bg-orange-50">
                  <Link href={SOCIAL_MEDIA_LINKS.instagram} target="_blank">
                    Instagram
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-orange-200 hover:bg-orange-50">
                  <Link href={SOCIAL_MEDIA_LINKS.facebook} target="_blank">
                    Facebook
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
