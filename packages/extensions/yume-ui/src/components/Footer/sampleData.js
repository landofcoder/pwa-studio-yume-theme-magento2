const accountLinks = new Map()
    .set('Account Information', '/account-information')
    .set('Sign In', '/sign-in')
    .set('Register', '/register')
    .set('Order Status', '/order-history');

const aboutLinks = new Map()
    .set('About Us', '/about-us')
    .set('Our Story', '/our-story')
    .set('Give Back', '/give-back')
    .set('Blog', '/blog.html')
    .set('Returns', '/');

const helpLinks = new Map()
    .set('FAQ', '/faq')
    .set('Contact Us', '/contact-us')
    .set('How To Order', '/how-to-order')
    .set('Refund-policy', '/refund-policy')
    .set('Delivery-information', '/delivery-information');

export const DEFAULT_LINKS = new Map()
    .set('account', accountLinks)
    .set('about', aboutLinks)
    .set('help', helpLinks);

export const LOREM_IPSUM =
    'Lorem ipsum dolor sit amet, consectetur adipsicing elit, sed do eiusmod tempor incididunt ut labore et dolore.';
