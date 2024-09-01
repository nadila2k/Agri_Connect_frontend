import "./Sector.css";

const AboutUs = () => {
  return (
    <section className="about-us">
      <h2 className="section-title">Our Vision and Mission</h2>
      <div className="about-us-content">
        <div className="about-us-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1DzqFJ-uX4N9Hm1AO-o88YUgG40sl6WPJTg&s"
            alt="Tractor"
            className="round-image"
          />
          <div className="card-content">
            <h3>Vision</h3>
            <p>
              AgriConnect envisions a future where Sri Lankan agriculture is modernized, sustainable, and empowered by technology. We aspire to create a thriving agricultural ecosystem where farmers, vendors, and government bodies collaborate seamlessly, leading to increased productivity, improved livelihoods, and a more resilient food system.
            </p>
          </div>
        </div>
        <div className="about-us-card mission">
          <img
            src="https://images.squarespace-cdn.com/content/v1/60a25ceb632adb0030c0946a/9b288238-cbef-4569-8ac3-56f0c33b7f50/combine-in-wheat-1024x686.jpg"
            alt="Harvesting"
            className="round-image"
          />
          <div className="card-content">
            <h3>Mission</h3>
            <p>
              AgriConnect is committed to empowering farmers with the tools and information they need, bridging gaps between farmers, vendors, and government bodies, promoting sustainable agriculture, leveraging technology for productivity and efficiency, and supporting the economic growth of Sri Lanka's agricultural sector.
            </p>
          </div>
        </div>
        <div className="about-us-card">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo__xMNigTfuHpSXsZ4VbQumj2jLcCHAoQ0w&s"
            alt="Vegetables"
            className="round-image"
          />
          <div className="card-content">
            <h3>Fresh Vegetables</h3>
            <p>
              We offer a variety of fresh and organic vegetables, handpicked for their quality and taste.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
