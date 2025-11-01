/**
 * Accessibility Testing Utilities
 * Helper functions to test WCAG compliance
 */

/**
 * Check color contrast ratio
 * WCAG AA requires 4.5:1 for normal text, 3:1 for large text
 */
export function checkColorContrast(
  foreground: string,
  background: string
): { ratio: number; passesAA: boolean; passesAAA: boolean } {
  const getLuminance = (rgb: { r: number; g: number; b: number }) => {
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
      val = val / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  // Parse hex colors (simplified - would need full implementation)
  const parseColor = (color: string) => {
    const hex = color.replace('#', '');
    return {
      r: parseInt(hex.substr(0, 2), 16),
      g: parseInt(hex.substr(2, 2), 16),
      b: parseInt(hex.substr(4, 2), 16),
    };
  };

  const fgLuminance = getLuminance(parseColor(foreground));
  const bgLuminance = getLuminance(parseColor(background));

  const ratio =
    (Math.max(fgLuminance, bgLuminance) + 0.05) /
    (Math.min(fgLuminance, bgLuminance) + 0.05);

  return {
    ratio: Math.round(ratio * 100) / 100,
    passesAA: ratio >= 4.5,
    passesAAA: ratio >= 7,
  };
}

/**
 * Validate touch target size (WCAG 2.5.5)
 * Minimum 44x44 CSS pixels
 */
export function validateTouchTarget(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return rect.width >= 44 && rect.height >= 44;
}

/**
 * Check if element has proper ARIA labels
 */
export function hasAccessibleName(element: HTMLElement): boolean {
  return !!(
    element.getAttribute('aria-label') ||
    element.getAttribute('aria-labelledby') ||
    element.textContent?.trim()
  );
}

/**
 * Validate heading hierarchy
 */
export function validateHeadingHierarchy(container: HTMLElement): {
  valid: boolean;
  issues: string[];
} {
  const headings = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  const issues: string[] = [];
  let previousLevel = 0;

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.charAt(1));

    if (index === 0 && level !== 1) {
      issues.push('First heading should be h1');
    }

    if (level > previousLevel + 1) {
      issues.push(
        `Heading level skipped: ${heading.tagName} after h${previousLevel}`
      );
    }

    previousLevel = level;
  });

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Check keyboard navigation
 */
export function testKeyboardNavigation(container: HTMLElement): boolean {
  const focusableElements = container.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  return Array.from(focusableElements).every(element => {
    const tabIndex = element.getAttribute('tabindex');
    return tabIndex === null || parseInt(tabIndex) >= 0;
  });
}

/**
 * Validate form accessibility
 */
export function validateFormAccessibility(form: HTMLFormElement): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  const inputs = form.querySelectorAll('input, select, textarea');

  inputs.forEach(input => {
    const id = input.getAttribute('id');
    const ariaLabel = input.getAttribute('aria-label');
    const ariaLabelledby = input.getAttribute('aria-labelledby');
    const label = id ? form.querySelector(`label[for="${id}"]`) : null;

    if (!label && !ariaLabel && !ariaLabelledby) {
      issues.push(`Input missing label: ${input.getAttribute('name') || 'unnamed'}`);
    }

    const type = input.getAttribute('type');
    if (input.hasAttribute('required') && !input.getAttribute('aria-required')) {
      issues.push(`Required field missing aria-required: ${input.getAttribute('name')}`);
    }
  });

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Check image alt text
 */
export function validateImageAltText(container: HTMLElement): {
  valid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  const images = container.querySelectorAll('img');

  images.forEach((img, index) => {
    const alt = img.getAttribute('alt');
    const ariaLabel = img.getAttribute('aria-label');
    const role = img.getAttribute('role');

    if (role === 'presentation' || role === 'none') {
      return; // Decorative images are okay without alt
    }

    if (!alt && !ariaLabel) {
      issues.push(`Image ${index + 1} missing alt text: ${img.src}`);
    }

    if (alt === '' && !role) {
      issues.push(`Image ${index + 1} has empty alt text without role="presentation"`);
    }
  });

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Run comprehensive accessibility audit
 */
export function runAccessibilityAudit(container: HTMLElement) {
  return {
    headingHierarchy: validateHeadingHierarchy(container),
    keyboardNavigation: testKeyboardNavigation(container),
    imageAltText: validateImageAltText(container),
    touchTargets: Array.from(
      container.querySelectorAll('button, a, input')
    ).every(el => validateTouchTarget(el as HTMLElement)),
  };
}
