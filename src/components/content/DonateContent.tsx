import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Users, Globe, Book, Zap, Shield, Gift } from 'lucide-react';

export function DonateContent() {

  const impactAreas = [
    {
      icon: Book,
      title: 'Content Development',
      description: 'Fund translation work, scholarly review, and content creation',
      percentage: 40
    },
    {
      icon: Zap,
      title: 'Technology & Infrastructure',
      description: 'Maintain servers, develop features, and ensure accessibility',
      percentage: 30
    },
    {
      icon: Globe,
      title: 'Outreach & Education',
      description: 'Spread awareness and create educational partnerships',
      percentage: 20
    },
    {
      icon: Shield,
      title: 'Preservation & Archive',
      description: 'Digital preservation and backup of sacred texts',
      percentage: 10
    }
  ];

  const donationTiers = [
    {
      amount: '$10',
      title: 'Supporter',
      description: 'Help maintain our servers for one day',
      benefits: ['Access to premium features', 'Monthly newsletter'],
      color: 'bg-blue-100 border-blue-200'
    },
    {
      amount: '$25',
      title: 'Advocate',
      description: 'Fund translation work for one verse',
      benefits: ['All Supporter benefits', 'Recognition on our supporters page'],
      color: 'bg-green-100 border-green-200'
    },
    {
      amount: '$50',
      title: 'Guardian',
      description: 'Support one chapter\'s video production',
      benefits: ['All Advocate benefits', 'Early access to new features'],
      color: 'bg-purple-100 border-purple-200'
    },
    {
      amount: '$108',
      title: 'Patron',
      description: 'Traditional auspicious amount in Hindu culture',
      benefits: ['All Guardian benefits', 'Personal thank you message'],
      color: 'bg-orange-100 border-orange-200',
      featured: true
    }
  ];

  const achievements = [
    { icon: Users, stat: '50,000+', label: 'Lives Touched' },
    { icon: Book, stat: '700+', label: 'Verses Available' },
    { icon: Globe, stat: '10+', label: 'Languages Supported' },
    { icon: Star, stat: '4.9', label: 'Average Rating' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-white/70 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
            <Badge variant="outline" className="bg-orange-100 text-orange-700 border-orange-200">
              Support Our Mission
            </Badge>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Help Preserve{' '}
            <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Ancient Wisdom
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Your generous support helps us maintain free access to the Bhagavad Gita for millions of 
            seekers worldwide, preserving this sacred knowledge for future generations.
          </p>

          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full px-6 py-3">
            <Heart className="w-5 h-5 text-orange-600" />
            <span className="text-orange-800 font-medium">Every contribution makes a difference</span>
          </div>
        </div>

        {/* Impact Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {achievements.map((achievement, index) => (
            <Card key={index} className="bg-white/70 backdrop-blur-sm border-orange-200 text-center">
              <CardContent className="py-6">
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <achievement.icon className="w-8 h-8 text-orange-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{achievement.stat}</div>
                <div className="text-sm text-gray-600">{achievement.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Donation Tiers */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Support Level</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every donation, regardless of size, helps us continue our mission of sharing spiritual wisdom
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
            {donationTiers.map((tier, index) => (
              <Card 
                key={index} 
                className={`${tier.color} relative ${tier.featured ? 'ring-2 ring-orange-300 transform scale-105' : ''} hover:shadow-lg transition-all`}
              >
                {tier.featured && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-orange-600 text-white">Most Popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">{tier.amount}</div>
                  <CardTitle className="text-xl">{tier.title}</CardTitle>
                  <p className="text-sm text-gray-600">{tier.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {tier.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-start text-sm">
                        <span className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${tier.featured ? 'bg-orange-600 hover:bg-orange-700' : ''}`}
                    variant={tier.featured ? 'default' : 'outline'}
                  >
                    <Gift className="w-4 h-4 mr-2" />
                    Donate {tier.amount}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Custom Amount */}
        <div className="mb-16">
          <Card className="bg-white/70 backdrop-blur-sm border-orange-200 max-w-2xl mx-auto">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900">Custom Amount</CardTitle>
              <p className="text-gray-600">Choose your own contribution amount</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600 font-medium">$</span>
                  <input
                    type="number"
                    placeholder="Enter amount"
                    className="flex-1 px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-transparent"
                    min="1"
                  />
                </div>
                <Button size="lg" className="w-full bg-orange-600 hover:bg-orange-700">
                  <Heart className="w-5 h-5 mr-2" />
                  Donate Now
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Secure payment processing • Tax-deductible receipt provided
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* How Funds Are Used */}
        <div className="mb-16">
          <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900 text-center mb-6">
                How Your Donation Helps
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-6">
                {impactAreas.map((area, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <area.icon className="w-8 h-8 text-orange-600" />
                    </div>
                    <div className="text-2xl font-bold text-orange-600 mb-2">{area.percentage}%</div>
                    <h3 className="font-semibold text-gray-900 mb-2">{area.title}</h3>
                    <p className="text-sm text-gray-600">{area.description}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-gray-600 max-w-3xl mx-auto">
                  We maintain complete transparency in how donations are used. Every contribution goes 
                  directly toward our mission of preserving and sharing the Bhagavad Gita's wisdom. 
                  Annual financial reports are available upon request.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alternative Ways to Help */}
        <div className="mb-16">
          <Card className="bg-white/70 backdrop-blur-sm border-orange-200">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-gray-900 text-center mb-6">
                Other Ways to Support
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Spread the Word</h3>
                  <p className="text-sm text-gray-600">Share our platform with friends and family interested in spiritual growth</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Book className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Contribute Content</h3>
                  <p className="text-sm text-gray-600">Help with translations, proofreading, or creating educational materials</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Leave a Review</h3>
                  <p className="text-sm text-gray-600">Share your experience to help others discover this resource</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact for Large Donations */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-orange-100 to-amber-100 border-orange-200 max-w-4xl mx-auto">
            <CardContent className="py-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Considering a Major Gift?
              </h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                For donations of $500 or more, we'd love to discuss how your contribution can create 
                lasting impact and explore opportunities for deeper partnership.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-orange-600 hover:bg-orange-700"
                  asChild
                >
                  <Link href="/contact">
                    <Heart className="w-5 h-5 mr-2" />
                    Contact Us
                  </Link>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-orange-200 hover:bg-orange-50"
                  asChild
                >
                  <Link href="/about">
                    Learn More About Our Mission
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
