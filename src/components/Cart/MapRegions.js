import React, {Component} from 'react';

class MapRegions extends Component {
    render() {
        return (
            <select className="r-input__select r-input__select--regions" onChange={this.props.onRegionChange}>
                <option value="0">выберите регион</option>
                <option value="1">АДЫГЕЯ РЕСПУБЛИКА</option>
                <option value="2">АЛТАЙ РЕСПУБЛИКА</option>
                <option value="3">АЛТАЙСКИЙ КРАЙ</option>
                <option value="4">АМУРСКАЯ ОБЛАСТЬ</option>
                <option value="5">АРХАНГЕЛЬСКАЯ ОБЛАСТЬ</option>
                <option value="6">АСТРАХАНСКАЯ ОБЛАСТЬ</option>
                <option value="7">БАШКОРТОСТАН РЕСПУБЛИКА</option>
                <option value="8">БЕЛГОРОДСКАЯ ОБЛАСТЬ</option>
                <option value="9">БРЯНСКАЯ ОБЛАСТЬ</option>
                <option value="10">БУРЯТИЯ РЕСПУБЛИКА</option>
                <option value="11">ВЛАДИМИРСКАЯ ОБЛАСТЬ</option>
                <option value="12">ВОЛГОГРАДСКАЯ ОБЛАСТЬ</option>
                <option value="13">ВОЛОГОДСКАЯ ОБЛАСТЬ</option>
                <option value="14">ВОРОНЕЖСКАЯ ОБЛАСТЬ</option>
                <option value="15">ДАГЕСТАН РЕСПУБЛИКА</option>
                <option value="16">ЕВРЕЙСКАЯ АВТОНОМНАЯ ОБЛАСТЬ</option>
                <option value="17">ЗАБАЙКАЛЬСКИЙ КРАЙ</option>
                <option value="18">ИВАНОВСКАЯ ОБЛАСТЬ</option>
                <option value="19">ИНГУШЕТИЯ РЕСПУБЛИКА</option>
                <option value="20">ИРКУТСКАЯ ОБЛАСТЬ</option>
                <option value="21">КАБАРДИНО-БАЛКАРСКАЯ РЕСПУБЛИКА</option>
                <option value="22">КАЛИНИНГРАДСКАЯ ОБЛАСТЬ</option>
                <option value="23">КАЛМЫКИЯ РЕСПУБЛИКА</option>
                <option value="24">КАЛУЖСКАЯ ОБЛАСТЬ</option>
                <option value="25">КАМЧАТСКИЙ КРАЙ</option>
                <option value="26">КАРАЧАЕВО-ЧЕРКЕССКАЯ РЕСПУБЛИКА</option>
                <option value="27">КАРЕЛИЯ РЕСПУБЛИКА</option>
                <option value="28">КЕМЕРОВСКАЯ ОБЛАСТЬ</option>
                <option value="29">КИРОВСКАЯ ОБЛАСТЬ</option>
                <option value="30">КОМИ РЕСПУБЛИКА</option>
                <option value="31">КОСТРОМСКАЯ ОБЛАСТЬ</option>
                <option value="32">КРАСНОДАРСКИЙ КРАЙ</option>
                <option value="33">КРАСНОЯРСКИЙ КРАЙ</option>
                <option value="85">КРЫМ РЕСПУБЛИКА</option>
                <option value="34">КУРГАНСКАЯ ОБЛАСТЬ</option>
                <option value="35">КУРСКАЯ ОБЛАСТЬ</option>
                <option value="36">ЛЕНИНГРАДСКАЯ ОБЛАСТЬ</option>
                <option value="37">ЛИПЕЦКАЯ ОБЛАСТЬ</option>
                <option value="38">МАГАДАНСКАЯ ОБЛАСТЬ</option>
                <option value="39">МАРИЙ ЭЛ РЕСПУБЛИКА</option>
                <option value="40">МОРДОВИЯ РЕСПУБЛИКА</option>
                <option value="86">МОСКВА</option>
                <option value="41">МОСКОВСКАЯ ОБЛАСТЬ</option>
                <option value="42">МУРМАНСКАЯ ОБЛАСТЬ</option>
                <option value="43">НЕНЕЦКИЙ АВТОНОМНЫЙ ОКРУГ</option>
                <option value="44">НИЖЕГОРОДСКАЯ ОБЛАСТЬ</option>
                <option value="45">НОВГОРОДСКАЯ ОБЛАСТЬ</option>
                <option value="46">НОВОСИБИРСКАЯ ОБЛАСТЬ</option>
                <option value="48">ОМСКАЯ ОБЛАСТЬ</option>
                <option value="49">ОРЕНБУРГСКАЯ ОБЛАСТЬ</option>
                <option value="50">ОРЛОВСКАЯ ОБЛАСТЬ</option>
                <option value="51">ПЕНЗЕНСКАЯ ОБЛАСТЬ</option>
                <option value="52">ПЕРМСКИЙ КРАЙ</option>
                <option value="53">ПРИМОРСКИЙ КРАЙ</option>
                <option value="54">ПСКОВСКАЯ ОБЛАСТЬ</option>
                <option value="55">РОСТОВСКАЯ ОБЛАСТЬ</option>
                <option value="56">РЯЗАНСКАЯ ОБЛАСТЬ</option>
                <option value="57">САМАРСКАЯ ОБЛАСТЬ</option>
                <option value="87">САНКТ-ПЕТЕРБУРГ</option>
                <option value="58">САРАТОВСКАЯ ОБЛАСТЬ</option>
                <option value="59">САХА (ЯКУТИЯ) РЕСПУБЛИКА</option>
                <option value="60">САХАЛИНСКАЯ ОБЛАСТЬ</option>
                <option value="61">СВЕРДЛОВСКАЯ ОБЛАСТЬ</option>
                <option value="62">СЕВЕРНАЯ ОСЕТИЯ-АЛАНИЯ РЕСПУБЛИКА</option>
                <option value="63">СМОЛЕНСКАЯ ОБЛАСТЬ</option>
                <option value="64">СТАВРОПОЛЬСКИЙ КРАЙ</option>
                <option value="65">ТАЙМЫРСКИЙ ДОЛГАНО-НЕНЕЦКИЙ РАЙОН</option>
                <option value="66">ТАМБОВСКАЯ ОБЛАСТЬ</option>
                <option value="67">ТАТАРСТАН РЕСПУБЛИКА</option>
                <option value="68">ТВЕРСКАЯ ОБЛАСТЬ</option>
                <option value="69">ТОМСКАЯ ОБЛАСТЬ</option>
                <option value="70">ТУЛЬСКАЯ ОБЛАСТЬ</option>
                <option value="71">ТЫВА РЕСПУБЛИКА</option>
                <option value="72">ТЮМЕНСКАЯ ОБЛАСТЬ</option>
                <option value="73">УДМУРТСКАЯ РЕСПУБЛИКА</option>
                <option value="74">УЛЬЯНОВСКАЯ ОБЛАСТЬ</option>
                <option value="75">ХАБАРОВСКИЙ КРАЙ</option>
                <option value="76">ХАКАСИЯ РЕСПУБЛИКА</option>
                <option value="77">ХАНТЫ-МАНСИЙСКИЙ-ЮГРА АВТОНОМНЫЙ ОКРУГ</option>
                <option value="78">ЧЕЛЯБИНСКАЯ ОБЛАСТЬ</option>
                <option value="79">ЧЕЧЕНСКАЯ РЕСПУБЛИКА</option>
                <option value="80">ЧУВАШСКАЯ РЕСПУБЛИКА</option>
                <option value="81">ЧУКОТСКИЙ АВТОНОМНЫЙ ОКРУГ</option>
                <option value="82">ЯМАЛО-НЕНЕЦКИЙ АВТОНОМНЫЙ ОКРУГ</option>
                <option value="83">ЯРОСЛАВСКАЯ ОБЛАСТЬ</option>
            </select>
        );
    }
};

export default MapRegions;
