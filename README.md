# TPExpress Admin Dashboard

A comprehensive Next.js-based administrative dashboard for TPExpress delivery and logistics company. This application provides a complete management system for handling orders, customers, drivers, employees, and customer service operations.

## 🚀 Features

### Core Functionality

- **Authentication System**: Secure login/logout with role-based access control
- **Dashboard Analytics**: Real-time charts and statistics for business insights
- **Order Management**: Complete order lifecycle management with status tracking
- **Customer Management**: Customer database with detailed profiles and history
- **Driver Management**: Driver registration, profiles, and performance tracking
- **Employee Management**: Account management for different user roles
- **Customer Service**: CSKH (Customer Service) request handling system

### User Roles

- **Admin**: Full system access and management capabilities
- **Support**: Customer service operations and request handling
- **Saleman**: Sales and order management functions

### Key Modules

#### 📊 Dashboard

- Real-time order statistics and trends
- Interactive charts (Line charts, Pie charts)
- Order status distribution
- Revenue analytics over time
- Performance metrics

#### 📦 Order Management

- Order creation and tracking
- Status updates (Pending, Delivering, Success, Canceled)
- Delivery service management
- Payment tracking (COD and delivery fees)
- Order history and details

#### 👥 Customer Management

- Customer database with detailed profiles
- Search and filter capabilities
- Customer order history
- Contact information management

#### 🚛 Driver Management

- Driver registration and profiles
- License and vehicle information
- Performance tracking
- Active order count
- Violation tracking

#### 👨‍💼 Employee Management

- User account management
- Role assignment and permissions
- Employee status tracking
- Account details and profiles

#### 🎧 Customer Service (CSKH)

- Request handling system
- Status management (Pending, Checking, Agree, Deny)
- Request type categorization
- Response management

## 🛠️ Technology Stack

### Frontend

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Material-UI**: React component library
- **Recharts**: Data visualization library
- **React Toastify**: Notification system

### Backend Integration

- **RESTful API**: Integration with backend services
- **JWT Authentication**: Secure token-based authentication
- **Cookie Management**: Session management with cookies

### Development Tools

- **ESLint**: Code linting
- **PostCSS**: CSS processing
- **Custom Fonts**: Geist font family integration

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication pages
│   ├── accounts/          # Employee management
│   ├── api/               # API routes
│   ├── customers/         # Customer management
│   ├── dashboard/         # Main dashboard
│   ├── drivers/           # Driver management
│   ├── order/             # Order management
│   └── cskh/              # Customer service
├── components/            # Reusable components
│   ├── AuthComponents/    # Authentication components
│   ├── Charts/           # Data visualization
│   ├── CommonComponents/  # Shared UI components
│   ├── CustomerComponents/
│   ├── DashboardComponents/
│   ├── drivers/          # Driver-specific components
│   └── OrderComponents/  # Order-related components
├── contexts/             # React contexts
├── hooks/               # Custom React hooks
├── middleware.ts        # Route protection
├── Pictures/           # Static images
├── Style/              # CSS stylesheets
└── Svg/               # SVG icons
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm
- Backend API server running on `http://localhost:5000`

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd <Your project file>
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup

Make sure your backend API server is running on `http://localhost:5000` with the following endpoints:

- Authentication: `/api/auth`
- Users: `/api/user/`
- Orders: `/api/order/`
- Customers: `/api/customer/`
- Drivers: `/api/driver/`
- Requests: `/api/request/`

## 🔐 Authentication & Security

The application implements a secure authentication system with:

- **JWT Token Management**: Secure token storage and validation
- **Route Protection**: Middleware-based route protection
- **Role-Based Access**: Different permissions for different user roles
- **Session Management**: Automatic session handling with cookies

### Protected Routes

- `/dashboard` - Main dashboard
- `/customers` - Customer management
- `/drivers` - Driver management
- `/accounts` - Employee management
- `/order` - Order management
- `/cskh` - Customer service

## 📊 Dashboard Features

### Analytics & Charts

- **Order Status Distribution**: Pie chart showing order status breakdown
- **Revenue Trends**: Line chart displaying revenue over time
- **Performance Metrics**: Key performance indicators
- **Real-time Updates**: Live data updates

### Data Management

- **Search & Filter**: Advanced search and filtering capabilities
- **Sorting**: Multi-column sorting functionality
- **Pagination**: Efficient data pagination
- **Export**: Data export capabilities

## 🎨 UI/UX Features

### Design System

- **Modern Interface**: Clean and professional design
- **Responsive Design**: Mobile-friendly layout
- **Custom Icons**: SVG-based icon system
- **Toast Notifications**: User feedback system
- **Loading States**: Smooth loading experiences

### Navigation

- **Sidebar Navigation**: Easy access to all modules
- **Breadcrumb Navigation**: Clear navigation hierarchy
- **Quick Actions**: Fast access to common functions

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

### Code Structure

- **TypeScript**: Full type safety
- **Component Architecture**: Modular component design
- **Custom Hooks**: Reusable logic
- **Context API**: State management
- **CSS Modules**: Scoped styling

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary software for TPExpress. All rights reserved.

## 🆘 Support

For technical support or questions, please contact the development team.

---

**TPExpress Admin Dashboard** - Empowering logistics management with modern web technology.
