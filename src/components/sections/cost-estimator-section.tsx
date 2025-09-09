'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { FadeIn } from '../fade-in';
import { Button } from '../ui/button';

const projectTypes = [
  { value: '15000', name: 'Basic Website' },
  { value: '35000', name: 'Custom Web Application' },
  { value: '50000', name: 'Mobile App (iOS & Android)' },
  { value: '25000', name: 'Digital Marketing Campaign' },
];

const additionalFeatures = [
  { value: '5000', name: 'E-commerce Integration' },
  { value: '7500', name: 'Custom Content Management System (CMS)' },
  { value: '3000', name: 'Advanced Analytics & Reporting' },
  { value: '10000', name: 'Multi-language Support' },
];

const CostEstimatorSection = () => {
  const [projectTypeCost, setProjectTypeCost] = useState(0);
  const [featureCosts, setFeatureCosts] = useState<Record<string, number>>({});

  const totalCost = useMemo(() => {
    const featuresTotal = Object.values(featureCosts).reduce((acc, cost) => acc + cost, 0);
    return projectTypeCost + featuresTotal;
  }, [projectTypeCost, featureCosts]);

  const handleFeatureChange = (checked: boolean, value: string, name: string) => {
    setFeatureCosts(prev => {
      const newCosts = { ...prev };
      if (checked) {
        newCosts[name] = Number(value);
      } else {
        delete newCosts[name];
      }
      return newCosts;
    });
  };

  return (
    <section id="estimator" className="py-16 md:py-24">
      <div className="container mx-auto px-4 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Project Cost Estimator</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
            Get a rough estimate for your project instantly. Note: This is a preliminary estimate and final cost may vary.
          </p>
        </FadeIn>
        <FadeIn>
          <Card className="max-w-3xl mx-auto p-6 md:p-8 text-left">
            <form id="estimator-form">
              <div className="mb-6">
                <Label className="block font-medium mb-2">1. Select Project Type</Label>
                <Select onValueChange={(value) => setProjectTypeCost(Number(value))}>
                  <SelectTrigger className="w-full p-3">
                    <SelectValue placeholder="Select a service..." />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map(pt => (
                      <SelectItem key={pt.name} value={pt.value}>{pt.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-6">
                <Label className="block font-medium mb-2">2. Additional Features</Label>
                <div className="space-y-3">
                  {additionalFeatures.map(feature => (
                    <div key={feature.name} className="flex items-center space-x-3">
                      <Checkbox
                        id={feature.name}
                        onCheckedChange={(checked) => handleFeatureChange(checked as boolean, feature.value, feature.name)}
                      />
                      <Label htmlFor={feature.name} className="text-muted-foreground font-normal">{feature.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-8 text-center">
                <div className="text-xl md:text-2xl font-bold text-foreground">
                  <span className="text-muted-foreground">Estimated Cost:</span>
                  <span id="estimatedCost" className="gradient-text ml-2">${totalCost.toLocaleString()}</span>
                </div>
                {totalCost > 0 && (
                  <a href="#payment">
                    <Button id="proceedToPaymentBtn" className="btn-primary text-white font-medium rounded-full mt-6">
                      Proceed to Payment
                    </Button>
                  </a>
                )}
              </div>
            </form>
          </Card>
        </FadeIn>
      </div>
    </section>
  );
};

export default CostEstimatorSection;
