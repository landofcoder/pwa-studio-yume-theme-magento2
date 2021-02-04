import React from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useQuery } from '@apollo/client';
import { GET_BANNERS_SLIDER } from './BannerSlider.gql';
import LoadingIndicator from '@landofcoder/yume-ui/src/components/LoadingIndicator';
import RichContent from '@landofcoder/yume-ui/src/components/RichContent';
import styles from './style.css';
import { connect } from 'react-redux';

const Banner = props => {
    if (props.storeConfig && props.storeConfig.config && props.storeConfig.config.default_homepage_slider) {
        const { loading, error, data } = useQuery(GET_BANNERS_SLIDER, {
            variables: {
                sliderId: parseInt(props.storeConfig.config.default_homepage_slider)
            }
        });
        if (loading) return <LoadingIndicator />;
        if (error) {
            console.log('ERROR', error);
            return null;
        }
        if (data) {
            console.log('DATA', data);
        }
        console.log('store redux', props.storeConfig);
        const items = data.lofBannerSlider.banners.map((banner, index) => {
            if (banner.resource_type == 'youtube_video') {
                return (
                    <div key={index} style={{ height: '100%' }}>
                        <iframe
                            src={banner.resource_path}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            style={{
                                maxWidth: banner.resource_map.max_width,
                                minWidth: banner.resource_map.min_width
                            }}
                        />
                    </div>
                );
            } else if (banner.resource_type == 'external_image') {
                if (banner.link) {
                    return (
                        <div key={index}>
                            <a href={`${banner.link}`}>
                                <img
                                    className={styles.bannerImage}
                                    src={banner.resource_path}
                                    style={{
                                        maxWidth: banner.resource_map.max_width,
                                        minWidth: banner.resource_map.min_width
                                    }}
                                />
                                <p className={styles.bannerTitle}>
                                    {banner.title}
                                </p>
                            </a>
                        </div>
                    );
                } else {
                    return (
                        <div key={index}>
                            <img
                                className={styles.bannerImage}
                                src={banner.resource_path}
                                style={{
                                    maxWidth: banner.resource_map.max_width,
                                    minWidth: banner.resource_map.min_width
                                }}
                            />
                            <p className={styles.bannerTitle}>{banner.title}</p>
                        </div>
                    );
                }
            } else if (banner.resource_type == 'local_image') {
                if (banner.link) {
                    return (
                        <div key={index}>
                            <a href={`${banner.link}`}>
                                <img
                                    className={styles.bannerImage}
                                    src={`http://magento2.landofcoder.com/media/${
                                        banner.resource_path
                                    }`}
                                    style={{
                                        maxWidth: banner.resource_map.max_width,
                                        minWidth: banner.resource_map.min_width
                                    }}
                                />
                                <p className={styles.bannerTitle}>
                                    {banner.title}
                                </p>
                            </a>
                        </div>
                    );
                } else {
                    return (
                        <div key={index}>
                            <img
                                className={styles.bannerImage}
                                src={`http://magento2.landofcoder.com/media/${
                                    banner.resource_path
                                }`}
                                style={{
                                    maxWidth: banner.resource_map.max_width,
                                    minWidth: banner.resource_map.min_width
                                }}
                            />
                            <p className={styles.bannerTitle}>{banner.title}</p>
                        </div>
                    );
                }
            } else {
                return (
                    <div
                        key={index}
                        className={styles.bannerImage}
                        style={{
                            maxWidth: banner.resource_map.max_width,
                            minWidth: banner.resource_map.min_width
                        }}
                    >
                        <RichContent html={banner.resource_path} />
                    </div>
                );
            }
        });
        return (
            <Carousel
                showIndicators={props.storeConfig.config.show_dots}
                swipeable={true}
                showArrows={props.storeConfig.config.show_nav}
                autoPlay={props.storeConfig.config.autoplay}
                infiniteLoop
                stopOnHover
                showThumbs={false}
                dynamicHeight
                // transitionTime={props.storeConfig.config.sliding_speed}
            >
                {items}
            </Carousel>
        );
    }
    return <LoadingIndicator />
};
const mapStateToProps = state => {
    return {
        storeConfig: state.storeConfig
    };
};
export default connect(
    mapStateToProps,
    null
)(Banner);
