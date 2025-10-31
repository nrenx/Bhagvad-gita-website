import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Book, Heart, Users, Globe, Award, Target, Lightbulb } from 'lucide-react';

export function AboutContent() {

  const features = [
    {
      icon: Book,
      title: 'Complete Text',
      description: 'All 700+ verses with Sanskrit, transliteration, and English translations'
    },
    {
      icon: Globe,
      title: 'Multi-language Support',
      description: 'Video commentaries available in 10+ regional languages'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built with feedback from scholars, students, and spiritual seekers'
    },
    {
      icon: Award,
      title: 'Authentic Sources',
      description: 'Translations from respected commentators and traditional sources'
    }
  ];

  const goals = [
    {
      icon: Target,
      title: 'Accessibility',
      description: 'Make the Bhagavad Gita accessible to people of all backgrounds and technical abilities'
    },
    {
      icon: Lightbulb,
      title: 'Understanding',
      description: 'Provide comprehensive resources to help readers truly understand the teachings'
    },
    {
      icon: Heart,
      title: 'Preservation',
      description: 'Preserve and share this ancient wisdom for future generations'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
              About Us
            </Badge>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Ancient Wisdom,{' '}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Modern Experience
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're dedicated to making the timeless teachings of the Bhagavad Gita accessible to everyone 
            through beautiful design, authentic translations, and comprehensive educational resources.
          </p>
        </div>

        {/* Mission Section */}
        <div className="mb-16">
          <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
            <CardHeader className="text-center pb-6">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-4">Our Mission</CardTitle>
              <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                To bridge the gap between ancient spiritual wisdom and modern digital accessibility, 
                creating a comprehensive platform that honors the traditional teachings while embracing 
                contemporary learning methods.
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="text-center group">
                    <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="w-8 h-8 text-orange-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Goals Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Goals</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every feature we build serves these fundamental principles
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {goals.map((goal, index) => (
              <Card key={index} className="bg-white/70 backdrop-blur-sm border-orange-200 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-lg p-3">
                      <goal.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl">{goal.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{goal.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* About the Bhagavad Gita Section */}
        <div className="mb-16">
          <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900 text-center mb-6">
                About the Bhagavad Gita
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-lg max-w-none">
              <div className="grid lg:grid-cols-2 gap-8 text-gray-600">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">The Scripture</h3>
                  <p className="mb-4">
                    The Bhagavad Gita, often referred to as the Gita, is a 700-verse Hindu scripture 
                    that is part of the epic Mahabharata. It is a conversation between Prince Arjuna 
                    and Lord Krishna, who serves as his charioteer.
                  </p>
                  <p className="mb-4">
                    Set on the battlefield of Kurukshetra, the Gita addresses the moral and philosophical 
                    dilemmas faced by Arjuna as he prepares for battle. Through their dialogue, Krishna 
                    reveals profound spiritual truths about life, duty, and the nature of reality.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Universal Teachings</h3>
                  <p className="mb-4">
                    The Bhagavad Gita is renowned for its universal message that transcends religious 
                    boundaries. Its teachings on dharma (righteous duty), karma (action), and moksha 
                    (liberation) offer guidance for ethical living and spiritual growth.
                  </p>
                  <p className="mb-4">
                    The three main paths outlined in the Gita - Karma Yoga (path of action), 
                    Bhakti Yoga (path of devotion), and Jnana Yoga (path of knowledge) - provide 
                    frameworks for spiritual development suited to different temperaments and life situations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology & Approach Section */}
        <div className="mb-16">
          <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900 text-center mb-6">
                Our Approach
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Authentic Content</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Sanskrit verses with accurate transliteration
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Multiple traditional commentaries and interpretations
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Word-by-word translations for deeper understanding
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Cross-references with other Hindu scriptures
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Modern Technology</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Responsive design for all devices
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Fast loading and offline reading capabilities
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Advanced search and navigation features
                    </li>
                    <li className="flex items-start">
                      <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      Integrated video and audio content
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-orange-100 to-amber-100 border-orange-200">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Begin Your Journey
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Start exploring the timeless wisdom of the Bhagavad Gita. Whether you're new to the 
                text or a longtime student, our platform offers resources for every level of understanding.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-orange-600 hover:bg-orange-700"
                  asChild
                >
                  <Link href="/chapters">
                    <Book className="w-5 h-5 mr-2" />
                    Start Reading
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-orange-200 hover:bg-orange-50"
                  asChild
                >
                  <Link href="/contact">
                    Contact Us
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
