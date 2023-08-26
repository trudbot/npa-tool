import {computed, ref} from "vue";

export function useSlider(item: {color: string}[]) {
    const sliderWidthP = 100 / item.length;
    const sliderWidth: string = sliderWidthP + '%';
    const sliderSite = ref<number>(0);

    const sliderColor = computed(() => {
        return item[sliderSite.value].color;
    });
    const left = computed(() => {
        return sliderWidthP * sliderSite.value + '%';
    })

    // hover回退记录
    let temp = 0;
    // hover过程中是否click了
    let clicked: boolean = false;
    function setSite(site: number) {
        if (site < 0 || site >= item.length) {
            return;
        }
        sliderSite.value = site;
    }

    function click(site: number) {
        clicked = true;
        setSite(site);
    }

    function hoverStart(site: number) {
        clicked = false;
        temp = sliderSite.value;
        setSite(site);
    }

    function hoverEnd() {
        // // 如果hover过程中执行了click, 就不再回退
        if (clicked) return;
        setSite(temp);
    }
    return {sliderWidth, setSite, left, hoverStart, hoverEnd, sliderColor, click, sliderSite};
}
